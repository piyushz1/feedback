import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const user = await currentUser();

  if (!user?.id) {
    // Send an error response with status code 400 and a JSON message.
    return new Response(
      JSON.stringify({
        success: false,
        message: "Email and password are required",
      }),
      { status: 400 }
    );
  }

  try {
    const boards = await prisma.board.findMany({
      where: {
        authorId: user?.id,
      },
    });

    return new Response(JSON.stringify(boards), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server Error!" }), {
      status: 500,
    });
  }
}
