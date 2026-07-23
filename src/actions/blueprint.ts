"use server";

import { headers } from "next/headers";
import { getAIProvider } from "@/lib/ai";
import { checkRateLimit } from "@/lib/rate-limit";
import type { ChatMessage, BlueprintData } from "@/lib/ai/types";
import type { ActionResult } from "@/types/actions";

export async function generateBlueprint(
  history: ChatMessage[],
): Promise<ActionResult<BlueprintData>> {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { success: withinLimit } = checkRateLimit(`blueprint:${ip}`);
  if (!withinLimit) {
    return {
      success: false,
      error: "Too many requests from this connection. Please wait a moment and try again.",
    };
  }

  try {
    const provider = getAIProvider();
    const blueprint = await provider.generateBlueprint(history);
    return { success: true, data: blueprint };
  } catch (error) {
    console.error("[generateBlueprint] failed", error);
    return {
      success: false,
      error: "Something went wrong generating your blueprint. Please try again.",
    };
  }
}
