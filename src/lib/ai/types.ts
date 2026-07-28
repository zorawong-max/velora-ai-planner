import type { z } from "zod";
import type { blueprintSchema } from "./schemas";

export type BlueprintData = z.infer<typeof blueprintSchema>;

/**
 * Provider-agnostic contract for the Blueprint backend. Every provider
 * (OpenAI today; Claude/Azure OpenAI/etc. later) implements this same
 * interface so application code never depends on a specific vendor SDK —
 * only `lib/ai/index.ts` (the factory) knows which concrete class is in use.
 */
export interface AIProvider {
  generateBlueprint(answers: BlueprintData): Promise<BlueprintData>;
}
