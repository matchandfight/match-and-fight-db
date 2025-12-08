import { create } from 'zustand';
import { mockOfertas, Oferta } from '@/data/mockData';

interface OfertasState {
  ofertas: Oferta[];
  fetchOfertas: (peleadorId?: string) => Promise<void>;
  acceptOferta: (ofertaId: string) => Promise<void>;
  rejectOferta: (ofertaId: string) => Promise<void>;
}

export const useOfertasStore = create<OfertasState>((set) => ({
  ofertas: [],

  fetchOfertas: async (peleadorId?: string) => {
    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 300));

    let ofertas = mockOfertas;
    if (peleadorId) {
      ofertas = mockOfertas.filter((o) => o.peleador === peleadorId);
    }

    set({ ofertas });
  },

  acceptOferta: async (ofertaId: string) => {
    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 300));

    set((state) => ({
      ofertas: state.ofertas.map((o) =>
        o.id === ofertaId ? { ...o, estado: 'ACEPTADA' as const } : o
      ),
    }));
  },

  rejectOferta: async (ofertaId: string) => {
    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 300));

    set((state) => ({
      ofertas: state.ofertas.map((o) =>
        o.id === ofertaId ? { ...o, estado: 'RECHAZADA' as const } : o
      ),
    }));
  },
}));

