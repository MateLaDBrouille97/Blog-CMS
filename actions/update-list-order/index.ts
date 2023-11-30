"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import prismadb from "@/lib/prismadb";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateListOrder } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, boardId,blogId} = data;
  let lists;

  try {
    const transaction = items.map((list) => 
      prismadb.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      })
    );

    lists = await prismadb.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder."
    }
  }

  revalidatePath(`/${blogId}/workplace/board/${boardId}`);
  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);