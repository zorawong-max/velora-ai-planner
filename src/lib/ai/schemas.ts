import { z } from "zod";

// What the model returns for a single conversational turn. `readyForBlueprint`
// is the model's own judgment call — once true, the app generates a blueprint
// instead of continuing to ask questions.
export const conversationTurnSchema = z.object({
  reply: z.string(),
  readyForBlueprint: z.boolean(),
});

// Structured infrastructure blueprint, generated from the full conversation.
// Field names line up with the sections already rendered in BlueprintView.
export const blueprintSchema = z.object({
  workloadType: z.string(),
  gpuConfiguration: z.string(),
  hardwareCondition: z.string(),
  targetTimeline: z.string(),
  locationPreference: z.string(),
  deploymentSupport: z.string(),
  estimatedBudget: z.string(),
  commercialModel: z.string(),
  currency: z.string(),
});
