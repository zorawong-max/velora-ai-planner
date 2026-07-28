import type { BlueprintData } from "./types";

const FIELD_LABELS: Record<keyof BlueprintData, string> = {
  workloadType: "Workload type",
  gpuConfiguration: "GPU configuration",
  hardwareCondition: "Hardware condition",
  targetTimeline: "Target timeline",
  locationPreference: "Location preference",
  deploymentSupport: "Deployment support",
  estimatedBudget: "Estimated budget",
  commercialModel: "Commercial model",
  currency: "Currency",
};

export function formatBlueprintAnswers(answers: BlueprintData): string {
  return (Object.keys(FIELD_LABELS) as (keyof BlueprintData)[])
    .map((key) => `${FIELD_LABELS[key]}: ${answers[key]}`)
    .join("\n");
}

export const BLUEPRINT_SYSTEM_PROMPT = `You are VELORA Blueprint™, an enterprise AI infrastructure planning tool. You will receive a customer's direct answers to a structured intake form covering compute requirements, deployment plan, and estimated investment. Rewrite each answer into clear, professional, concise blueprint language.

Rules:
1. Use ONLY the facts given below — never invent, assume, or infer a specification, quantity, date, location, or price that was not explicitly stated.
2. If an answer is vague or says "not sure" / "no preference", keep the field appropriately general (e.g. "To be determined") rather than guessing a concrete value.
3. Do not change the meaning of an answer, only its phrasing. Keep every field concise — a short phrase, not a paragraph.
4. Return exactly the nine required fields.`;
