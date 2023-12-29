"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import prismadb from "@/lib/prismadb";
import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateWhiteboard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId,blogId,cardId } = data;
  let card;

  try {

    const card = await prismadb.card.findUnique({
      where: {
        id: cardId,
      },
    });

    if (!card) {
      return {
        error: "List not found",
      };
    }
    
    await createAuditLog({
      entityId: cardId,
      entityTitle: card?.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Failed to create."
    }
  }

  revalidatePath(`/${blogId}/workplace/whiteboard/${cardId}`);
  return { data: card };
};

export const createWhiteBoard = createSafeAction(CreateWhiteboard, handler);