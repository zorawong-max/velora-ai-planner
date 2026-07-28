"use client";

import { SelectField } from "./SelectField";
import {
  TARGET_TIMELINE_OPTIONS,
  LOCATION_PREFERENCE_OPTIONS,
  DEPLOYMENT_SUPPORT_OPTIONS,
} from "./field-options";
import type { BlueprintData } from "@/lib/ai/types";

export function DeploymentStep({
  answers,
  onChange,
}: {
  answers: Partial<BlueprintData>;
  onChange: (patch: Partial<BlueprintData>) => void;
}) {
  return (
    <div className="space-y-6">
      <SelectField
        label="Target timeline"
        value={answers.targetTimeline ?? ""}
        options={TARGET_TIMELINE_OPTIONS}
        onChange={(targetTimeline) => onChange({ targetTimeline })}
      />

      <SelectField
        label="Location preference"
        value={answers.locationPreference ?? ""}
        options={LOCATION_PREFERENCE_OPTIONS}
        allowOther
        otherPlaceholder="Describe the preferred location"
        onChange={(locationPreference) => onChange({ locationPreference })}
      />

      <SelectField
        label="Deployment support"
        value={answers.deploymentSupport ?? ""}
        options={DEPLOYMENT_SUPPORT_OPTIONS}
        onChange={(deploymentSupport) => onChange({ deploymentSupport })}
      />
    </div>
  );
}
