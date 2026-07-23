"use server";

import { headers } from "next/headers";
import { rfqSchema } from "@/schemas/rfq";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import type { ChatMessage, BlueprintData } from "@/lib/ai/types";
import type { RfqSubmissionInsert } from "@/types/database";
import type { ActionResult } from "@/types/actions";
import type { RfqInput } from "@/schemas/rfq";

export interface SubmitRfqInput extends RfqInput {
  blueprint: BlueprintData;
  conversation: ChatMessage[];
}

export async function submitRfq(input: SubmitRfqInput): Promise<ActionResult<null>> {
  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { success: withinLimit } = checkRateLimit(`rfq:${ip}`);
  if (!withinLimit) {
    return {
      success: false,
      error: "Too many submissions from this connection. Please try again later.",
    };
  }

  const parsed = rfqSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Please check your details and try again." };
  }

  if (parsed.data.hpAddress) {
    // Honeypot tripped — silently report success to avoid tipping off bots.
    return { success: true, data: null };
  }

  if (!input.blueprint) {
    return {
      success: false,
      error: "No blueprint found for this session. Please complete the conversation first.",
    };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("[submitRfq] Supabase is not configured (missing URL or anon key)");
    return {
      success: false,
      error: "RFQ submission isn't available yet. Please try again shortly.",
    };
  }

  const insertPayload: RfqSubmissionInsert = {
    company_name: parsed.data.companyName,
    contact_email: parsed.data.contactEmail,
    notes: parsed.data.notes || null,
    blueprint: input.blueprint,
    conversation: input.conversation,
  };

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("rfq_submissions").insert(insertPayload);

    if (error) {
      console.error("[submitRfq] Supabase insert failed", error);
      return {
        success: false,
        error: "Something went wrong submitting your RFQ. Please try again.",
      };
    }

    return { success: true, data: null };
  } catch (error) {
    console.error("[submitRfq] Unexpected failure", error);
    return {
      success: false,
      error: "Something went wrong submitting your RFQ. Please try again.",
    };
  }
}
