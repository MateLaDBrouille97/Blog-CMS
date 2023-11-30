"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteBoard } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
// import { decreaseAvailableCount } from "@/lib/org-limit";
// import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  // const isPro = await checkSubscription();

  const { id,blogId } = data;
  let board;

  try {
    board = await prismadb.board.delete({
      where: {
        id,
        orgId,
      },
    });

    // if (!isPro) {
    //   await decreaseAvailableCount();
    // }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    })
  } catch (error) {
    return {
      error: "Failed to delete."
    }
  }

  revalidatePath(`/${blogId}/workplace/organization/${orgId}`);
  redirect(`/${blogId}/workplace/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);