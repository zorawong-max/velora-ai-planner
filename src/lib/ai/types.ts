import type { z } from "zod";
import type { conversationTurnSchema, blueprintSchema } from "./schemas";

export type ChatRole = "user" | "assistant";

// A `type` (not `interface`) so it keeps TypeScript's implicit index
// signature — needed to satisfy supabase-js's `Record<string, unknown>`
// jsonb column constraint when persisted in actions/rfq.ts.
export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ConversationTurnResult = z.infer<typeof conversationTurnSchema>;
export type BlueprintData = z.infer<typeof blueprintSchema>;

/**
 * Provider-agnostic contract for the AI Planner backend. Every provider
 * (OpenAI today; Claude/Azure OpenAI/etc. later) implements this same
 * interface so application code never depends on a specific vendor SDK —
 * only `lib/ai/index.ts` (the factory) knows which concrete class is in use.
 */
export interface AIProvider {
  continueConversation(history: ChatMessage[]): Promise<ConversationTurnResult>;
  generateBlueprint(history: ChatMessage[]): Promise<BlueprintData>;
}
