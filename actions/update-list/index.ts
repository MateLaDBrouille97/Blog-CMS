"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import prismadb from "@/lib/prismadb";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateList } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id, boardId,blogId } = data;
  let list;

  try {
    list = await prismadb.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.UPDATE,
    })
  } catch (error) {
    return {
      error: "Failed to update."
    }
  }

  revalidatePath(`/${blogId}/workplace/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);