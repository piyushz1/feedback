import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;

  const boardId = searchParams.get("boardId");

  if (!boardId) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Board id required",
      }),
      { status: 400 }
    );
  }

  try {
    const board = await prisma.board.findFirst({
      where: {
        id: boardId,
      },
    });

    return new Response(JSON.stringify(board), { status: 200 });
  } catch (error) {
    console.log("error: ", error);
    return new Response(JSON.stringify({ message: "Server Error!" }), {
      status: 500,
    });
  }
}
