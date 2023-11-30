"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import prismadb from "@/lib/prismadb";
import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";

import { CopyCard } from "./schema";
import { InputType, ReturnType } from "./types";
import { useRouter } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  


  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId,blogId } = data;
  let card;

  try {
    const cardToCopy = await prismadb.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!cardToCopy) {
      return { error: "Card not found" }
    }

    const lastCard = await prismadb.card.findFirst({
      where: { listId: cardToCopy.listId },
      orderBy: { order: "desc" },
      select: { order: true }
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await prismadb.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        order: newOrder,
        listId: cardToCopy.listId,
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    })
  } catch (error) {
    return {
      error: "Failed to copy."
    }
  }

  revalidatePath(`/${blogId}/workplace/board/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);