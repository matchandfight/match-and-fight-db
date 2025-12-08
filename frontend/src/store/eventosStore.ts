import { create } from 'zustand';
import { 
  Evento, 
  Inscripcion, 
  Combate, 
  mockEventos, 
  mockInscripciones, 
  mockCombates,
  mockPeleadores,
  Peleador
} from '@/data/mockData';

interface EventosState {
  eventos: Evento[];
  inscripciones: Inscripcion[];
  combates: Combate[];
  loading: boolean;
  
  // Eventos
  fetchEventos: () => Promise<void>;
  getEventoById: (id: string) => Evento | undefined;
  getEventosByPromotor: (promotorId: string) => Evento[];
  getEventosDisponibles: () => Evento[];
  getEventosPendientesAprobacion: () => Evento[];
  createEvento: (evento: Omit<Evento, 'id' | 'peleadores'>) => Promise<Evento>;
  updateEvento: (id: string, data: Partial<Evento>) => Promise<void>;
  enviarARevision: (id: string) => Promise<void>;
  aprobarEvento: (id: string, adminId: string) => Promise<void>;
  rechazarEvento: (id: string, motivo: string) => Promise<void>;
  publicarEvento: (id: string) => Promise<void>;
  abrirInscripciones: (id: string) => Promise<void>;
  cerrarInscripciones: (id: string) => Promise<void>;
  finalizarEvento: (id: string) => Promise<void>;
  
  // Inscripciones
  fetchInscripciones: (managerId?: string) => Promise<void>;
  getInscripcionesByEvento: (eventoId: string) => Inscripcion[];
  getInscripcionesByManager: (managerId: string) => Inscripcion[];
  getInscripcionesByPeleador: (peleadorId: string) => Inscripcion[];
  inscribirPeleador: (inscripcion: Omit<Inscripcion, 'id' | 'fechaInscripcion' | 'estado'>) => Promise<void>;
  aceptarInscripcion: (id: string) => Promise<void>;
  rechazarInscripcion: (id: string) => Promise<void>;
  
  // Combates
  fetchCombates: (eventoId: string) => Promise<void>;
  getCombatesByEvento: (eventoId: string) => Combate[];
  crearCombate: (combate: Omit<Combate, 'id' | 'estado'>) => Promise<void>;
  registrarResultado: (combateId: string, resultado: Combate['resultado']) => Promise<void>;
  
  // Helpers
  getPeleadorById: (id: string) => Peleador | undefined;
}

export const useEventosStore = create<EventosState>((set, get) => ({
  eventos: [],
  inscripciones: [],
  combates: [],
  loading: false,

  // ========== EVENTOS ==========
  
  fetchEventos: async () => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 300));
    set({ eventos: [...mockEventos], loading: false });
  },

  getEventoById: (id: string) => {
    return get().eventos.find(e => e.id === id);
  },

  getEventosByPromotor: (promotorId: string) => {
    return get().eventos.filter(e => e.promotorId === promotorId);
  },

  getEventosDisponibles: () => {
    return get().eventos.filter(e => 
      e.inscripcionesAbiertas && 
      (e.estado === 'INSCRIPCIONES_ABIERTAS' || e.estado === 'PUBLICADO')
    );
  },

  getEventosPendientesAprobacion: () => {
    return get().eventos.filter(e => e.estado === 'PENDIENTE_APROBACION');
  },

  createEvento: async (eventoData) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const nuevoEvento: Evento = {
      ...eventoData,
      id: `evt_${Date.now()}`,
      peleadores: 0,
    };
    
    set(state => ({ 
      eventos: [...state.eventos, nuevoEvento],
      loading: false 
    }));
    
    return nuevoEvento;
  },

  updateEvento: async (id, data) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    set(state => ({
      eventos: state.eventos.map(e => 
        e.id === id ? { ...e, ...data } : e
      ),
      loading: false
    }));
  },

  enviarARevision: async (id) => {
    await get().updateEvento(id, { estado: 'PENDIENTE_APROBACION' });
  },

  aprobarEvento: async (id, adminId) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    set(state => ({
      eventos: state.eventos.map(e => 
        e.id === id 
          ? { 
              ...e, 
              estado: 'PUBLICADO' as const,
              fechaAprobacion: new Date().toISOString().split('T')[0],
              aprobadoPor: adminId,
              motivoRechazo: undefined,
            } 
          : e
      ),
      loading: false
    }));
  },

  rechazarEvento: async (id, motivo) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    set(state => ({
      eventos: state.eventos.map(e => 
        e.id === id 
          ? { 
              ...e, 
              estado: 'RECHAZADO' as const,
              motivoRechazo: motivo,
            } 
          : e
      ),
      loading: false
    }));
  },

  publicarEvento: async (id) => {
    await get().updateEvento(id, { estado: 'PUBLICADO' });
  },

  abrirInscripciones: async (id) => {
    await get().updateEvento(id, { 
      estado: 'INSCRIPCIONES_ABIERTAS',
      inscripcionesAbiertas: true 
    });
  },

  cerrarInscripciones: async (id) => {
    await get().updateEvento(id, { 
      estado: 'INSCRIPCIONES_CERRADAS',
      inscripcionesAbiertas: false 
    });
  },

  finalizarEvento: async (id) => {
    await get().updateEvento(id, { estado: 'FINALIZADO' });
  },

  // ========== INSCRIPCIONES ==========

  fetchInscripciones: async (managerId?: string) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let inscripciones = [...mockInscripciones];
    if (managerId) {
      inscripciones = inscripciones.filter(i => i.managerId === managerId);
    }
    
    set({ inscripciones, loading: false });
  },

  getInscripcionesByEvento: (eventoId: string) => {
    return get().inscripciones.filter(i => i.eventoId === eventoId);
  },

  getInscripcionesByManager: (managerId: string) => {
    return get().inscripciones.filter(i => i.managerId === managerId);
  },

  getInscripcionesByPeleador: (peleadorId: string) => {
    return get().inscripciones.filter(i => i.peleadorId === peleadorId);
  },

  inscribirPeleador: async (inscripcionData) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const nuevaInscripcion: Inscripcion = {
      ...inscripcionData,
      id: `ins_${Date.now()}`,
      estado: 'PENDIENTE',
      fechaInscripcion: new Date().toISOString().split('T')[0],
    };
    
    set(state => {
      // Actualizar contador de peleadores en el evento
      const eventos = state.eventos.map(e => 
        e.id === inscripcionData.eventoId 
          ? { ...e, peleadores: e.peleadores + 1 }
          : e
      );
      
      return { 
        inscripciones: [...state.inscripciones, nuevaInscripcion],
        eventos,
        loading: false 
      };
    });
  },

  aceptarInscripcion: async (id) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    set(state => ({
      inscripciones: state.inscripciones.map(i => 
        i.id === id ? { ...i, estado: 'ACEPTADA' } : i
      ),
      loading: false
    }));
  },

  rechazarInscripcion: async (id) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    set(state => ({
      inscripciones: state.inscripciones.map(i => 
        i.id === id ? { ...i, estado: 'RECHAZADA' } : i
      ),
      loading: false
    }));
  },

  // ========== COMBATES ==========

  fetchCombates: async (eventoId: string) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const combates = mockCombates.filter(c => c.eventoId === eventoId);
    set({ combates, loading: false });
  },

  getCombatesByEvento: (eventoId: string) => {
    return get().combates.filter(c => c.eventoId === eventoId);
  },

  crearCombate: async (combateData) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const nuevoCombate: Combate = {
      ...combateData,
      id: `comb_${Date.now()}`,
      estado: 'PROGRAMADO',
    };
    
    set(state => ({ 
      combates: [...state.combates, nuevoCombate],
      loading: false 
    }));
  },

  registrarResultado: async (combateId, resultado) => {
    set({ loading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    
    set(state => {
      const combate = state.combates.find(c => c.id === combateId);
      
      if (combate && resultado) {
        // Actualizar ELO de los peleadores (simulado)
        // En una app real, esto se haría en el backend
        const ganadorId = resultado.ganadorId;
        const perdedorId = ganadorId === combate.peleador1Id 
          ? combate.peleador2Id 
          : combate.peleador1Id;
        
        // Los cambios de ELO se harían aquí
        console.log(`Resultado registrado: ${ganadorId ? 'Ganador: ' + ganadorId : 'Empate'}, Perdedor: ${perdedorId}`);
      }
      
      return {
        combates: state.combates.map(c => 
          c.id === combateId 
            ? { ...c, estado: 'FINALIZADO' as const, resultado }
            : c
        ),
        loading: false
      };
    });
  },

  // ========== HELPERS ==========

  getPeleadorById: (id: string) => {
    return mockPeleadores.find(p => p.id === id);
  },
}));

