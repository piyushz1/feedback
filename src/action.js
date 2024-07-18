"use server";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createBoard(formData) {
  const user = await currentUser();
  const data = {
    boardName: formData.get("boardName"),
    autherId: user?.id,
  };

  try {
    const res = await axios({
      data: data,
      method: "POST",
      url: `http://localhost:3000/api/create-board`,
    });

    revalidatePath("/dashboard", "page");
    revalidateTag("dashboard");

    return res.data;
  } catch (error) {}
}
