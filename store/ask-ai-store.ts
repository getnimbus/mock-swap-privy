import { create } from "zustand";

interface AskAIState {
  positionId: string | null;
  setPositionId: (positionId: string | null) => void;
  askMsg: any | null;
  setAskMsg: (message: any | null) => void;
}

export const useAskAIStore = create<AskAIState>((set) => ({
  positionId: null,
  setPositionId: (positionId) => set({ positionId }),
  askMsg: null,
  setAskMsg: (message) => set({ askMsg: message }),
}));
