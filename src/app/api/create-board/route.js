import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(req) {
  
  // Get the body
  const { boardName, autherId } = await req.json();
  console.log(' boardName, autherId : ',  boardName, autherId );

  if (!boardName || !autherId) {
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
    const res = await prisma.board.create({
      data: {
        id: uuidv4(),
        title: boardName,
        createdAt: new Date(),
        authorId: autherId,
      },
    });

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.log('error: ', error);
    return new Response(JSON.stringify({ message: "Server Error!" }), {
      status: 500,
    });
  }
}
