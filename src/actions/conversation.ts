"use server";

import { headers } from "next/headers";
import { getAIProvider } from "@/lib/ai";
import { checkRateLimit } from "@/lib/rate-limit";
import type { ChatMessage, ConversationTurnResult } from "@/lib/ai/types";
import type { ActionResult } from "@/types/actions";

export async function continueConversation(
  history: ChatMessage[],
): Promise<ActionResult<ConversationTurnResult>> {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { success: withinLimit } = checkRateLimit(`conversation:${ip}`);
  if (!withinLimit) {
    return {
      success: false,
      error: "Too many messages from this connection. Please wait a moment and try again.",
    };
  }

  try {
    const provider = getAIProvider();
    const result = await provider.continueConversation(history);
    return { success: true, data: result };
  } catch (error) {
    console.error("[continueConversation] failed", error);
    return {
      success: false,
      error: "Something went wrong talking to the AI Planner. Please try again.",
    };
  }
}
