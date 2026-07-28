"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePlannerStore, WIZARD_STEPS, type WizardStep } from "@/store/planner-store";
import { generateBlueprint } from "@/actions/blueprint";
import { blueprintSchema } from "@/lib/ai/schemas";
import { BlueprintView } from "./BlueprintView";
import { WizardProgress } from "./steps/WizardProgress";
import { ComputeStep } from "./steps/ComputeStep";
import { DeploymentStep } from "./steps/DeploymentStep";
import { InvestmentStep } from "./steps/InvestmentStep";
import type { BlueprintData } from "@/lib/ai/types";

const REQUIRED_FIELDS_BY_STEP: Record<WizardStep, (keyof BlueprintData)[]> = {
  compute: ["workloadType", "gpuConfiguration", "hardwareCondition"],
  deployment: ["targetTimeline", "locationPreference", "deploymentSupport"],
  investment: ["estimatedBudget", "commercialModel", "currency"],
};

const STEP_TITLES: Record<WizardStep, string> = {
  compute: "Compute Requirements",
  deployment: "Deployment Plan",
  investment: "Estimated Investment",
};

function isStepComplete(step: WizardStep, answers: Partial<BlueprintData>) {
  return REQUIRED_FIELDS_BY_STEP[step].every((field) => (answers[field] ?? "").trim().length > 0);
}

export function BlueprintFlow() {
  const step = usePlannerStore((state) => state.step);
  const answers = usePlannerStore((state) => state.answers);
  const blueprint = usePlannerStore((state) => state.blueprint);
  const setAnswers = usePlannerStore((state) => state.setAnswers);
  const setStep = usePlannerStore((state) => state.setStep);
  const setBlueprint = usePlannerStore((state) => state.setBlueprint);

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (blueprint) {
    return <BlueprintView />;
  }

  const stepIndex = WIZARD_STEPS.indexOf(step);
  const isLastStep = stepIndex === WIZARD_STEPS.length - 1;
  const stepComplete = isStepComplete(step, answers);

  function handleBack() {
    if (stepIndex > 0) setStep(WIZARD_STEPS[stepIndex - 1]);
  }

  function handleNext() {
    setError(null);
    if (!stepComplete) return;

    if (!isLastStep) {
      setStep(WIZARD_STEPS[stepIndex + 1]);
      return;
    }

    const parsed = blueprintSchema.safeParse(answers);
    if (!parsed.success) {
      setError("Please complete every field before generating your blueprint.");
      return;
    }

    startTransition(async () => {
      const result = await generateBlueprint(parsed.data);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setBlueprint(result.data);
    });
  }

  return (
    <div className="space-y-6">
      <WizardProgress step={step} />

      <Card>
        <CardContent className="space-y-6 pt-2">
          <h2 className="text-lg font-semibold">{STEP_TITLES[step]}</h2>

          {step === "compute" && <ComputeStep answers={answers} onChange={setAnswers} />}
          {step === "deployment" && <DeploymentStep answers={answers} onChange={setAnswers} />}
          {step === "investment" && <InvestmentStep answers={answers} onChange={setAnswers} />}

          {error && <p className="text-destructive text-xs">{error}</p>}

          <div className="flex items-center justify-between gap-3 pt-2">
            <Button variant="outline" onClick={handleBack} disabled={stepIndex === 0 || isPending}>
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!stepComplete || isPending}
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              {isLastStep ? (isPending ? "Generating…" : "Generate Blueprint") : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
