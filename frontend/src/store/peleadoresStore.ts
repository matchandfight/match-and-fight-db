import { create } from 'zustand';
import { mockPeleadores, Peleador, filterPeleadores } from '@/data/mockData';

interface PeleadoresState {
  peleadores: Peleador[];
  filteredPeleadores: Peleador[];
  selectedPeleador: Peleador | null;
  filters: {
    clase?: string;
    genero?: string;
    pais?: string;
    modalidad?: string;
    disponible?: boolean;
  };
  fetchPeleadores: () => Promise<void>;
  getPeleadorById: (id: string) => Peleador | undefined;
  setFilters: (filters: PeleadoresState['filters']) => void;
  clearFilters: () => void;
  setSelectedPeleador: (peleador: Peleador | null) => void;
}

export const usePeleadoresStore = create<PeleadoresState>((set, get) => ({
  peleadores: [],
  filteredPeleadores: [],
  selectedPeleador: null,
  filters: {},

  fetchPeleadores: async () => {
    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 300));
    set({ peleadores: mockPeleadores, filteredPeleadores: mockPeleadores });
  },

  getPeleadorById: (id: string) => {
    return get().peleadores.find((p) => p.id === id);
  },

  setFilters: (filters) => {
    set({ filters });
    const filtered = filterPeleadores(filters);
    set({ filteredPeleadores: filtered });
  },

  clearFilters: () => {
    set({ filters: {}, filteredPeleadores: get().peleadores });
  },

  setSelectedPeleador: (peleador) => {
    set({ selectedPeleador: peleador });
  },
}));


