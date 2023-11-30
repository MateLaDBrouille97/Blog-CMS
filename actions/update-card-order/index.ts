"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import prismadb from "@/lib/prismadb";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateCardOrder } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, boardId,blogId } = data;
  let updatedCards;

  try {
    const transaction = items.map((card) => 
      prismadb.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      }),
    );

    updatedCards = await prismadb.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder."
    }
  }

  revalidatePath(`/${blogId}/workplace/board/${boardId}`);
  return { data: updatedCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);