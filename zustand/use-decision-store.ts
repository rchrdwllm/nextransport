import { create } from "zustand";

interface DecisionStoreInitialState {
  decision: "wait" | "go" | null;
  setDecision: (decision: "wait" | "go" | null) => void;
}

export const useDecisionStore = create<DecisionStoreInitialState>((set) => ({
  decision: null,
  setDecision: (decision) => set({ decision }),
}));
