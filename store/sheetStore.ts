import { SheetOption, SheetParams } from '@/types';
import { create } from 'zustand';

interface SheetStore {
  params: SheetParams | undefined;
  selected: SheetOption | undefined;
  show: (params: SheetParams) => void;
  hide: () => void;
  setSelected: (item: SheetOption) => void;
}

export const useSheetStore = create<SheetStore>(set => ({
  params: undefined,
  selected: undefined,
  show: ({ options, title = 'Selecciona una opción' }) => {
    set({ params: { options, title } });
  },
  hide: () => set({ params: undefined }),
  setSelected: item => set({ selected: item }),
}));
