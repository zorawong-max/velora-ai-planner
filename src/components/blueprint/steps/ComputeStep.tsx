"use client";

import { useId } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectField } from "./SelectField";
import { WORKLOAD_TYPE_OPTIONS, HARDWARE_CONDITION_OPTIONS } from "./field-options";
import type { BlueprintData } from "@/lib/ai/types";

export function ComputeStep({
  answers,
  onChange,
}: {
  answers: Partial<BlueprintData>;
  onChange: (patch: Partial<BlueprintData>) => void;
}) {
  const gpuId = useId();

  return (
    <div className="space-y-6">
      <SelectField
        label="Workload type"
        value={answers.workloadType ?? ""}
        options={WORKLOAD_TYPE_OPTIONS}
        allowOther
        otherPlaceholder="Describe the workload type"
        onChange={(workloadType) => onChange({ workloadType })}
      />

      <div className="space-y-2">
        <Label htmlFor={gpuId}>GPU configuration</Label>
        <Input
          id={gpuId}
          value={answers.gpuConfiguration ?? ""}
          onChange={(event) => onChange({ gpuConfiguration: event.target.value })}
          placeholder="e.g. 8x H100 80GB, NVLink"
        />
      </div>

      <SelectField
        label="Hardware condition"
        value={answers.hardwareCondition ?? ""}
        options={HARDWARE_CONDITION_OPTIONS}
        onChange={(hardwareCondition) => onChange({ hardwareCondition })}
      />
    </div>
  );
}
