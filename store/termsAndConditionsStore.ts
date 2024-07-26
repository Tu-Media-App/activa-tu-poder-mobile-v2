import { create } from 'zustand';

interface TermsAndConditionsStore {
  isAccepted: boolean;
  toggle: () => void;
}

export const useTermsAndConditionsStore = create<TermsAndConditionsStore>(set => ({
  isAccepted: false,
  toggle: () => set(state => ({ isAccepted: !state.isAccepted })),
}));
