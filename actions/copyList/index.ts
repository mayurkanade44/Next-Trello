"use server";

import { createSafeAction } from "@/lib/createSafeAction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CopyList } from "./schema";
import { InputType, ReturnType } from "./types";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  let list;

  try {
    const copyList = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: { orgId },
      },
      include: {
        cards: true,
      },
    });

    if (!copyList) return { error: "List not found" };

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title: `${copyList.title} - Copy`,
        boardId: copyList.boardId,
        order: newOrder,
        cards: {
          createMany: {
            data: copyList.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });

    await createAuditLog({
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });

  } catch (error) {
    return {
      error: "Failed to copy list",
    };
  }

  revalidatePath(`/organization/${boardId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyList, handler);
