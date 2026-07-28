import { cn } from "@/lib/utils";
import { WIZARD_STEPS, type WizardStep } from "@/store/planner-store";

const STEP_LABELS: Record<WizardStep, string> = {
  compute: "Compute",
  deployment: "Deployment",
  investment: "Investment",
};

export function WizardProgress({ step }: { step: WizardStep }) {
  const activeIndex = WIZARD_STEPS.indexOf(step);

  return (
    <ol className="flex items-center gap-3">
      {WIZARD_STEPS.map((wizardStep, index) => (
        <li key={wizardStep} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                index <= activeIndex
                  ? "bg-brand text-brand-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {index + 1}
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                index <= activeIndex ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {STEP_LABELS[wizardStep]}
            </span>
          </div>
          {index < WIZARD_STEPS.length - 1 && (
            <span aria-hidden="true" className="bg-border h-px w-8 sm:w-12" />
          )}
        </li>
      ))}
    </ol>
  );
}
