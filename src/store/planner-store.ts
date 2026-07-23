"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatMessage, BlueprintData } from "@/lib/ai/types";

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hi — tell me about the AI infrastructure you're looking to plan. Include the workload type, scale, target timeline, and budget if you know them.",
};

interface PlannerState {
  messages: ChatMessage[];
  readyForBlueprint: boolean;
  blueprint: BlueprintData | null;
  addMessages: (messages: ChatMessage[]) => void;
  setReadyForBlueprint: (ready: boolean) => void;
  setBlueprint: (blueprint: BlueprintData) => void;
  reset: () => void;
}

/**
 * Client-side session state carrying the real conversation transcript and
 * generated blueprint across /conversation, /blueprint, and /rfq. There is
 * no server-side session store in this MVP — persisted to localStorage so
 * a refresh doesn't lose progress.
 */
export const usePlannerStore = create<PlannerState>()(
  persist(
    (set) => ({
      messages: [INITIAL_MESSAGE],
      readyForBlueprint: false,
      blueprint: null,
      addMessages: (newMessages) =>
        set((state) => ({ messages: [...state.messages, ...newMessages] })),
      setReadyForBlueprint: (ready) => set({ readyForBlueprint: ready }),
      setBlueprint: (blueprint) => set({ blueprint }),
      reset: () => set({ messages: [INITIAL_MESSAGE], readyForBlueprint: false, blueprint: null }),
    }),
    { name: "velora-ai-planner-session" },
  ),
);
