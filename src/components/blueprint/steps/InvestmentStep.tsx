"use client";

import { SelectField } from "./SelectField";
import { ESTIMATED_BUDGET_OPTIONS, COMMERCIAL_MODEL_OPTIONS, CURRENCY_OPTIONS } from "./field-options";
import type { BlueprintData } from "@/lib/ai/types";

export function InvestmentStep({
  answers,
  onChange,
}: {
  answers: Partial<BlueprintData>;
  onChange: (patch: Partial<BlueprintData>) => void;
}) {
  return (
    <div className="space-y-6">
      <SelectField
        label="Estimated budget"
        value={answers.estimatedBudget ?? ""}
        options={ESTIMATED_BUDGET_OPTIONS}
        onChange={(estimatedBudget) => onChange({ estimatedBudget })}
      />

      <SelectField
        label="Commercial model"
        value={answers.commercialModel ?? ""}
        options={COMMERCIAL_MODEL_OPTIONS}
        onChange={(commercialModel) => onChange({ commercialModel })}
      />

      <SelectField
        label="Currency"
        value={answers.currency ?? ""}
        options={CURRENCY_OPTIONS}
        allowOther
        otherPlaceholder="Specify currency"
        onChange={(currency) => onChange({ currency })}
      />
    </div>
  );
}
