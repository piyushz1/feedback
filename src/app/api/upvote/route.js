import { PrismaClient } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req, res) {
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

  const feedbackId = searchParams.get("feedbackId");

  if (!feedbackId) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Feedback ID is required",
      }),
      { status: 400 }
    );
  }

  try {
    // Check if the board exists
    const feedback = await prisma.feedback.findUnique({
      where: { id: feedbackId },
    });

    if (!feedback) {
      return new Response(
        JSON.stringify({
          message: "Feedback is removed by admin",
        }),
        { status: 404 }
      );
    }

    const existingUpvote = await prisma.upvote.findFirst({
      where: {
        feedbackId,
        userId: user.id,
      },
    });

    if (existingUpvote) {
      // Remove the existing upvote
      await prisma.upvote.delete({
        where: {
          id: existingUpvote.id,
        },
      });
      return new Response(JSON.stringify({ message: "Upvote removed" }), {
        status: 200,
      });
    } else {
      // Create a new upvote
      const newUpvote = await prisma.upvote.create({
        data: {
          feedbackId,
          userId: user.id,
          createdAt: new Date(),
        },
      });
      return new Response(JSON.stringify(newUpvote), { status: 200 });
    }
  } catch (error) {
    console.error("Error handling upvote:", error);
    return new Response(JSON.stringify({ message: "Server Error!" }), {
      status: 500,
    });
  }
}

export async function GET(req, res) {
  const { feedbackId } = req.query;

  if (!feedbackId) {
    return res.status(400).json({
      success: false,
      message: "Feedback ID is required",
    });
  }

  try {
    const upvoteCount = await prisma.upvote.count({
      where: {
        feedbackId,
      },
    });

    return res.status(200).json({ upvoteCount });
  } catch (error) {
    console.error("Error fetching upvotes:", error);
    return res.status(500).json({ message: "Server Error!" });
  }
}
