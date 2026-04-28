import { create } from 'zustand';

type TipoGasto = 'avista' | 'parcelado';

type Gasto = {
  descricao: string;
  valor: number;
  tipo: TipoGasto;
  parcelas?: number;
};

type FinanceStore = {
  renda: number;
  gastos: Gasto[];
  setRenda: (valor: number) => void;
  adicionarGasto: (gasto: Gasto) => void;
};

export const useFinanceStore = create<FinanceStore>((set) => ({
  renda: 0,
  gastos: [],

  setRenda: (valor) => set({ renda: valor }),

  adicionarGasto: (gasto) =>
    set((state) => ({
      gastos: [...state.gastos, gasto],
    })),
}));