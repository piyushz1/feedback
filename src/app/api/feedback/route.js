import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const user = await currentUser();

  if (!user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Unauthorized",
      }),
      {
        status: 401,
      }
    );
  }

  const searchParams = req.nextUrl.searchParams;

  const boardId = searchParams.get("boardId");

  const { title, description } = await req.json();

  if (!boardId || !title || !description) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Board ID, title, and description are required",
      }),
      { status: 400 }
    );
  }

  try {
    const newFeedback = await prisma.feedback.create({
      data: {
        title,
        description,
        createdAt: new Date(),
        authorId: user.id,
        boardId,
      },
    });

    return new Response(JSON.stringify(newFeedback), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server Error!" }), {
      status: 500,
    });
  }
}

export async function GET(req, res) {
  const user = await currentUser();

  const searchParams = req.nextUrl.searchParams;

  const boardId = searchParams.get("boardId");

  if (!boardId) {
    return new Response(
      JSON.stringify({
        message: "Board ID is required",
      }),
      { status: 400 }
    );
  }

  try {
    const feedbacks = await prisma.feedback.findMany({
      where: { boardId },
      include: {
        _count: {
          select: { upvotes: true },
        },
        upvotes: {
          where: { userId: user?.id },
        },
      },
    });

    const response = feedbacks.map((feedback) => ({
      ...feedback,
      upvotedByCurrentUser: feedback.upvotes.length > 0,
      totalUpvote: feedback._count.upvotes,
    }));

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server Error!" }), {
      status: 500,
    });
  }
}

export async function DELETE(req, res) {
  const searchParams = req.nextUrl.searchParams;

  const feedBackId = searchParams.get("feedBackId");
  console.log("feedBackId: ", feedBackId);

  if (!feedBackId) {
    return new Response(
      JSON.stringify({
        message: "feedBack ID is required",
      }),
      { status: 400 }
    );
  }

  try {
    await prisma.upvote.deleteMany({
      where: { feedbackId: feedBackId },
    });

    await prisma.feedback.delete({
      where: { id: feedBackId },
    });

    return new Response(JSON.stringify({ message: "FeedBack Deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.log("error: ", error);
    return new Response(JSON.stringify({ message: "Server Error!" }), {
      status: 500,
    });
  }
}
