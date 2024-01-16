"use server";

import { createSafeAction } from "@/lib/createSafeAction";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CopyCard } from "./schema";
import { InputType, ReturnType } from "./types";
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
  let card;

  try {
    const copyCard = await db.card.findUnique({
      where: {
        id,
        list: {
          board: { orgId },
        },
      },
    });

    if (!copyCard) return { error: "Card not found" };

    const lastCard = await db.card.findFirst({
      where: { listId: copyCard.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title: `${copyCard.title} - Copy`,
        description: copyCard.description,
        order: newOrder,
        listId: copyCard.listId,
      },
    });

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to copy list",
    };
  }

  revalidatePath(`/organization/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
