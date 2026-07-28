"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BlueprintData } from "@/lib/ai/types";

export type WizardStep = "compute" | "deployment" | "investment";

export const WIZARD_STEPS: WizardStep[] = ["compute", "deployment", "investment"];

interface PlannerState {
  step: WizardStep;
  answers: Partial<BlueprintData>;
  blueprint: BlueprintData | null;
  setAnswers: (patch: Partial<BlueprintData>) => void;
  setStep: (step: WizardStep) => void;
  setBlueprint: (blueprint: BlueprintData) => void;
  reset: () => void;
}

/**
 * Client-side session state carrying the wizard answers and generated
 * blueprint across /blueprint and /rfq. There is no server-side session
 * store in this MVP — persisted to localStorage so a refresh doesn't lose
 * progress.
 */
export const usePlannerStore = create<PlannerState>()(
  persist(
    (set) => ({
      step: "compute",
      answers: {},
      blueprint: null,
      setAnswers: (patch) => set((state) => ({ answers: { ...state.answers, ...patch } })),
      setStep: (step) => set({ step }),
      setBlueprint: (blueprint) => set({ blueprint }),
      reset: () => set({ step: "compute", answers: {}, blueprint: null }),
    }),
    { name: "velora-ai-planner-session" },
  ),
);
