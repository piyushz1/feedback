import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return new Response("Error occured", {
      status: 400,
    });
  }

  if (evt.type === "user.created") {
    await prisma.user.create({
      data: {
        id: evt.data?.id,
        name: evt.data?.first_name + evt?.data?.last_name,
        email: evt.data?.email_addresses?.[0]?.email_address,
        createdAt: new Date(evt.data?.created_at),
        lastLoginAt: new Date(evt?.data?.last_sign_in_at),
        updatedAt: new Date(evt?.data?.updated_at),
      },
    });
  } else if (evt.type === "user.updated") {
    await prisma.user.update({
      data: {
        name: evt.data?.first_name + evt?.data?.last_name,
        email: evt.data?.email_addresses?.[0]?.email_address,
        createdAt: new Date(evt.data?.created_at),
        lastLoginAt: evt?.data?.last_sign_in_at
          ? new Date(evt?.data?.last_sign_in_at)
          : null,
        updatedAt: new Date(evt?.data?.updated_at),
      },
      where: {
        id: evt.data?.id,
      },
    });
  }

  return new Response("", { status: 200 });
}
