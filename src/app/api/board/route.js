// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET(req) {
//   return new Response(JSON.stringify({ message: "Board Deleted" }), {
//     status: 200,
//   });
// }
// export async function DELETE(req, res) {
//   const searchParams = req.nextUrl.searchParams;

//   const boardId = searchParams.get("boardId");

//   if (!boardId) {
//     return new Response(
//       JSON.stringify({
//         message: "board ID is required",
//       }),
//       { status: 400 }
//     );
//   }

//   try {
//     // Check if the board exists
//     const board = await prisma.board.findUnique({
//       where: { id: boardId },
//     });

//     if (!board) {
//       return new Response(
//         JSON.stringify({
//           message: "Board not found",
//         }),
//         { status: 404 }
//       );
//     }

//     // Delete the board
//     await prisma.board.delete({
//       where: { id: boardId },
//     });
//     return new Response(JSON.stringify({ message: "Board Deleted" }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "Server Error!" }), {
//       status: 500,
//     });
//   }
// }
