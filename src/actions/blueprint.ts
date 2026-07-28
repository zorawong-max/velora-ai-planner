"use server";

import { headers } from "next/headers";
import { getAIProvider } from "@/lib/ai";
import { blueprintSchema } from "@/lib/ai/schemas";
import { checkRateLimit } from "@/lib/rate-limit";
import type { BlueprintData } from "@/lib/ai/types";
import type { ActionResult } from "@/types/actions";

export async function generateBlueprint(
  answers: BlueprintData,
): Promise<ActionResult<BlueprintData>> {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { success: withinLimit } = checkRateLimit(`generate:${ip}`);
  if (!withinLimit) {
    return {
      success: false,
      error: "Too many requests from this connection. Please wait a moment and try again.",
    };
  }

  const parsed = blueprintSchema.safeParse(answers);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please complete every step of the planning wizard before generating a blueprint.",
    };
  }

  try {
    const provider = getAIProvider();
    const blueprint = await provider.generateBlueprint(parsed.data);
    return { success: true, data: blueprint };
  } catch (error) {
    console.error("[generateBlueprint] failed", error);
    return {
      success: false,
      error: "Something went wrong generating your blueprint. Please try again.",
    };
  }
}
