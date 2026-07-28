import { z } from "zod";

// Structured infrastructure blueprint. The Planning Wizard collects one raw
// answer per field; `generateBlueprint` rewrites those into this same shape
// with polished, professional phrasing. Field names line up with the
// sections rendered in BlueprintView.
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
