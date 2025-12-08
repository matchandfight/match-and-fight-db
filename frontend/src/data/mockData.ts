// Datos de prueba para desarrollo y testing

export interface Peleador {
  id: string;
  nombre: string;
  alias?: string;
  clase: 'N' | 'C' | 'B' | 'A';
  edad: number;
  genero: 'MASCULINO' | 'FEMENINO';
  peso: number;
  altura: number;
  pais: string;
  ciudad: string;
  club: string;
  fotoUrl: string;
  redesSociales: string[];
  modalidad: 'MUAY_THAI' | 'K1';
  record: {
    combates: number;
    ganados: number;
    perdidos: number;
    empates: number;
    kos: number;
  };
  puntuacionElo: number;
  ultimoCombate?: string;
  disponible: boolean;
  verificado: boolean;
  managerId?: string; // ID del manager que lo representa
}

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  rol: 'ATLETA' | 'MANAGER' | 'PROMOTOR' | 'SUPER_ADMIN';
  peleadorId?: string; // Solo para ATLETA
  peleadoresAsociados?: string[]; // Solo para MANAGER - IDs de peleadores
  promotoraNombre?: string; // Solo para PROMOTOR
  fotoUrl?: string;
}

export interface Oferta {
  id: string;
  promotor: string;
  peleador: string;
  peleadorNombre: string;
  fecha: string;
  peso: string;
  bolsa?: number;
  estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA';
  ciudad: string;
}

export interface Highlight {
  id: string;
  titulo: string;
  descripcion: string;
  peleador: string;
  peleadorFoto: string;
  imagenUrl: string;
  tipo: 'KO' | 'VICTORIA' | 'CAMPEONATO' | 'RACHA';
  fecha: string;
  views: number;
  likes: number;
}

export interface Noticia {
  id: string;
  titulo: string;
  descripcion: string;
  contenido: string;
  imagenUrl: string;
  categoria: 'EVENTO' | 'RESULTADO' | 'RANKING' | 'ENTREVISTA';
  fecha: string;
  autor: string;
  leido: boolean;
}

// Combate individual dentro de un evento
export interface Combate {
  id: string;
  eventoId: string;
  peleador1Id: string;
  peleador2Id: string;
  peleador1Nombre: string;
  peleador2Nombre: string;
  categoriaId: string;
  peso: string;
  modalidad: 'MUAY_THAI' | 'K1';
  estado: 'PROGRAMADO' | 'EN_CURSO' | 'FINALIZADO' | 'CANCELADO';
  resultado?: {
    ganadorId: string | null; // null si es empate
    metodo: 'KO' | 'TKO' | 'DECISION' | 'DECISION_UNANIME' | 'DECISION_DIVIDIDA' | 'EMPATE' | 'NO_CONTEST';
    round?: number;
    tiempo?: string;
  };
}

// Inscripción de peleador en un evento
export interface Inscripcion {
  id: string;
  eventoId: string;
  peleadorId: string;
  managerId: string;
  peso: string;
  modalidad: 'MUAY_THAI' | 'K1';
  estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA' | 'EMPAREJADO';
  fechaInscripcion: string;
  notas?: string;
}

// Categoría de peso en un evento
export interface CategoriaEvento {
  id: string;
  nombre: string;
  pesoMin: number;
  pesoMax: number;
  modalidad: 'MUAY_THAI' | 'K1';
  genero: 'MASCULINO' | 'FEMENINO' | 'MIXTO';
  cupos: number;
  inscritos: number;
}

export interface Evento {
  id: string;
  nombre: string;
  descripcion?: string;
  fecha: string;
  horaInicio?: string;
  ciudad: string;
  pais: string;
  direccion?: string;
  promotorId: string;
  promotorNombre: string;
  estado: 'BORRADOR' | 'PENDIENTE_APROBACION' | 'RECHAZADO' | 'PUBLICADO' | 'INSCRIPCIONES_ABIERTAS' | 'INSCRIPCIONES_CERRADAS' | 'EN_CURSO' | 'FINALIZADO' | 'CANCELADO';
  categorias: CategoriaEvento[];
  imagenUrl?: string;
  inscripcionesAbiertas: boolean;
  fechaLimiteInscripcion?: string;
  peleadores: number; // Total de peleadores inscritos
  motivoRechazo?: string; // Razón del rechazo si fue rechazado
  fechaAprobacion?: string; // Fecha de aprobación por Super Admin
  aprobadoPor?: string; // ID del Super Admin que aprobó
}

export interface Ranking {
  posicion: number;
  peleador: Peleador;
  puntos: number;
  tendencia: 'up' | 'down' | 'same';
  cambio: number;
}

// Mock de usuarios
export const mockUsuarios: Usuario[] = [
  // ATLETAS
  {
    id: '1',
    email: 'carlos.atleta@test.com',
    nombre: 'Carlos Martínez',
    rol: 'ATLETA',
    peleadorId: '1',
    fotoUrl: 'https://ui-avatars.com/api/?name=Carlos+Martinez&size=200&background=3880ff&color=fff',
  },
  {
    id: '2',
    email: 'laura.atleta@test.com',
    nombre: 'Laura Sánchez',
    rol: 'ATLETA',
    peleadorId: '3',
    fotoUrl: 'https://ui-avatars.com/api/?name=Laura+Sanchez&size=200&background=eb445a&color=fff',
  },
  {
    id: '3',
    email: 'miguel.atleta@test.com',
    nombre: 'Ahmed Hassan',
    rol: 'ATLETA',
    peleadorId: '2',
    fotoUrl: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&size=200&background=2dd36f&color=fff',
  },
  // MANAGERS
  {
    id: '4',
    email: 'ana.manager@test.com',
    nombre: 'Ana Rodríguez',
    rol: 'MANAGER',
    peleadoresAsociados: ['1', '5', '7'],
    fotoUrl: 'https://ui-avatars.com/api/?name=Ana+Rodriguez&size=200&background=a855f7&color=fff',
  },
  {
    id: '5',
    email: 'pedro.manager@test.com',
    nombre: 'Pedro Sánchez',
    rol: 'MANAGER',
    peleadoresAsociados: ['2', '4'],
    fotoUrl: 'https://ui-avatars.com/api/?name=Pedro+Sanchez&size=200&background=6366f1&color=fff',
  },
  {
    id: '6',
    email: 'sofia.manager@test.com',
    nombre: 'Sofía Martín',
    rol: 'MANAGER',
    peleadoresAsociados: ['3', '6', '8'],
    fotoUrl: 'https://ui-avatars.com/api/?name=Sofia+Martin&size=200&background=ec4899&color=fff',
  },
  // PROMOTORES
  {
    id: '7',
    email: 'juan.promotor@test.com',
    nombre: 'Juan García',
    rol: 'PROMOTOR',
    promotoraNombre: 'Fight Night Madrid',
    fotoUrl: 'https://ui-avatars.com/api/?name=Juan+Garcia&size=200&background=f59e0b&color=fff',
  },
  {
    id: '8',
    email: 'maria.promotor@test.com',
    nombre: 'María López',
    rol: 'PROMOTOR',
    promotoraNombre: 'European Championship',
    fotoUrl: 'https://ui-avatars.com/api/?name=Maria+Lopez&size=200&background=22c55e&color=fff',
  },
  {
    id: '9',
    email: 'david.promotor@test.com',
    nombre: 'David Fernández',
    rol: 'PROMOTOR',
    promotoraNombre: 'Spanish Fight League',
    fotoUrl: 'https://ui-avatars.com/api/?name=David+Fernandez&size=200&background=ef4444&color=fff',
  },
  // SUPER ADMIN
  {
    id: '10',
    email: 'admin@test.com',
    nombre: 'Administrador',
    rol: 'SUPER_ADMIN',
    fotoUrl: 'https://ui-avatars.com/api/?name=Super+Admin&size=200&background=dc2626&color=fff',
  },
  {
    id: '11',
    email: 'superadmin@test.com',
    nombre: 'Carlos Admin',
    rol: 'SUPER_ADMIN',
    fotoUrl: 'https://ui-avatars.com/api/?name=Carlos+Admin&size=200&background=7c3aed&color=fff',
  },
];

// Mock de peleadores
export const mockPeleadores: Peleador[] = [
  {
    id: '1',
    nombre: 'Carlos Martínez',
    alias: 'El Toro',
    clase: 'A',
    edad: 28,
    genero: 'MASCULINO',
    peso: 70,
    altura: 178,
    pais: 'España',
    ciudad: 'Madrid',
    club: 'Lumpinee Madrid',
    fotoUrl: 'https://ui-avatars.com/api/?name=Carlos+Martinez&size=200&background=3880ff&color=fff',
    redesSociales: ['@eltoro_muaythai', 'facebook.com/eltoro'],
    modalidad: 'MUAY_THAI',
    record: {
      combates: 29,
      ganados: 23,
      perdidos: 5,
      empates: 1,
      kos: 15,
    },
    puntuacionElo: 1850,
    ultimoCombate: '2024-11-15',
    disponible: true,
    verificado: true,
    managerId: '4',
  },
  {
    id: '2',
    nombre: 'Ahmed Hassan',
    alias: 'The Hammer',
    clase: 'A',
    edad: 26,
    genero: 'MASCULINO',
    peso: 75,
    altura: 182,
    pais: 'Francia',
    ciudad: 'París',
    club: 'Fighting Spirit Paris',
    fotoUrl: 'https://ui-avatars.com/api/?name=Ahmed+Hassan&size=200&background=2dd36f&color=fff',
    redesSociales: ['@hammer_fighter'],
    modalidad: 'K1',
    record: {
      combates: 30,
      ganados: 26,
      perdidos: 4,
      empates: 0,
      kos: 18,
    },
    puntuacionElo: 1920,
    ultimoCombate: '2024-11-20',
    disponible: true,
    verificado: true,
    managerId: '5',
  },
  {
    id: '3',
    nombre: 'Laura Sánchez',
    alias: 'La Reina',
    clase: 'B',
    edad: 24,
    genero: 'FEMENINO',
    peso: 58,
    altura: 168,
    pais: 'España',
    ciudad: 'Barcelona',
    club: 'BCN Fighters',
    fotoUrl: 'https://ui-avatars.com/api/?name=Laura+Sanchez&size=200&background=eb445a&color=fff',
    redesSociales: ['@lareina_fighter', 'instagram.com/lareina'],
    modalidad: 'MUAY_THAI',
    record: {
      combates: 15,
      ganados: 12,
      perdidos: 3,
      empates: 0,
      kos: 5,
    },
    puntuacionElo: 1680,
    ultimoCombate: '2024-10-28',
    disponible: true,
    verificado: true,
    managerId: '6',
  },
  {
    id: '4',
    nombre: 'Marco Rossi',
    alias: 'Il Leone',
    clase: 'A',
    edad: 29,
    genero: 'MASCULINO',
    peso: 80,
    altura: 185,
    pais: 'Italia',
    ciudad: 'Milán',
    club: 'Milano Fight Club',
    fotoUrl: 'https://ui-avatars.com/api/?name=Marco+Rossi&size=200&background=ffc409&color=000',
    redesSociales: ['@illeone_fighter'],
    modalidad: 'K1',
    record: {
      combates: 28,
      ganados: 22,
      perdidos: 6,
      empates: 0,
      kos: 14,
    },
    puntuacionElo: 1780,
    ultimoCombate: '2024-11-10',
    disponible: false,
    verificado: true,
    managerId: '5',
  },
  {
    id: '5',
    nombre: 'David García',
    alias: 'El Rayo',
    clase: 'C',
    edad: 22,
    genero: 'MASCULINO',
    peso: 68,
    altura: 175,
    pais: 'España',
    ciudad: 'Valencia',
    club: 'Valencia Combat',
    fotoUrl: 'https://ui-avatars.com/api/?name=David+Garcia&size=200&background=3dc2ff&color=fff',
    redesSociales: ['@elrayo_fighter'],
    modalidad: 'MUAY_THAI',
    record: {
      combates: 10,
      ganados: 7,
      perdidos: 3,
      empates: 0,
      kos: 4,
    },
    puntuacionElo: 1450,
    ultimoCombate: '2024-09-15',
    disponible: true,
    verificado: false,
    managerId: '4',
  },
  {
    id: '6',
    nombre: 'Sophie Dubois',
    alias: 'La Panthère',
    clase: 'B',
    edad: 25,
    genero: 'FEMENINO',
    peso: 62,
    altura: 170,
    pais: 'Francia',
    ciudad: 'Lyon',
    club: 'Lyon Warriors',
    fotoUrl: 'https://ui-avatars.com/api/?name=Sophie+Dubois&size=200&background=9d9fa6&color=fff',
    redesSociales: ['@lapanthere'],
    modalidad: 'MUAY_THAI',
    record: {
      combates: 18,
      ganados: 14,
      perdidos: 4,
      empates: 0,
      kos: 6,
    },
    puntuacionElo: 1620,
    ultimoCombate: '2024-11-05',
    disponible: true,
    verificado: true,
    managerId: '6',
  },
  {
    id: '7',
    nombre: 'Luis Fernández',
    alias: 'El Matador',
    clase: 'N',
    edad: 20,
    genero: 'MASCULINO',
    peso: 65,
    altura: 172,
    pais: 'España',
    ciudad: 'Sevilla',
    club: 'Sevilla Fight Academy',
    fotoUrl: 'https://ui-avatars.com/api/?name=Luis+Fernandez&size=200&background=92949c&color=fff',
    redesSociales: [],
    modalidad: 'K1',
    record: {
      combates: 5,
      ganados: 3,
      perdidos: 2,
      empates: 0,
      kos: 1,
    },
    puntuacionElo: 1200,
    ultimoCombate: '2024-10-01',
    disponible: true,
    verificado: false,
    managerId: '4',
  },
  {
    id: '8',
    nombre: 'Pietro Lombardi',
    alias: 'Thunder',
    clase: 'A',
    edad: 27,
    genero: 'MASCULINO',
    peso: 77,
    altura: 180,
    pais: 'Italia',
    ciudad: 'Roma',
    club: 'Roma Fighting',
    fotoUrl: 'https://ui-avatars.com/api/?name=Pietro+Lombardi&size=200&background=222428&color=fff',
    redesSociales: ['@thunder_fighter'],
    modalidad: 'K1',
    record: {
      combates: 22,
      ganados: 18,
      perdidos: 4,
      empates: 0,
      kos: 11,
    },
    puntuacionElo: 1800,
    ultimoCombate: '2024-11-18',
    disponible: true,
    verificado: true,
    managerId: '6',
  },
];

// Mock de ofertas
export const mockOfertas: Oferta[] = [
  {
    id: '1',
    promotor: 'Fight Night Madrid',
    peleador: '1',
    peleadorNombre: 'Carlos Martínez',
    fecha: '2024-12-15',
    peso: '70kg',
    bolsa: 1500,
    estado: 'PENDIENTE',
    ciudad: 'Madrid',
  },
  {
    id: '2',
    promotor: 'European Championship',
    peleador: '1',
    peleadorNombre: 'Carlos Martínez',
    fecha: '2024-12-28',
    peso: '70kg',
    bolsa: 2500,
    estado: 'PENDIENTE',
    ciudad: 'Barcelona',
  },
  {
    id: '3',
    promotor: 'Valencia Combat Night',
    peleador: '1',
    peleadorNombre: 'Carlos Martínez',
    fecha: '2024-11-30',
    peso: '70kg',
    estado: 'RECHAZADA',
    ciudad: 'Valencia',
  },
];

// Mock de eventos con estructura extendida
export const mockEventos: Evento[] = [
  {
    id: '1',
    nombre: 'European K1 Championship',
    descripcion: 'El campeonato europeo de K1 más prestigioso del año. Participan los mejores peleadores de toda Europa.',
    fecha: '2024-12-15',
    horaInicio: '18:00',
    ciudad: 'Madrid',
    pais: 'España',
    direccion: 'Palacio de Deportes de Madrid',
    promotorId: '7',
    promotorNombre: 'Fight Night Madrid',
    estado: 'INSCRIPCIONES_ABIERTAS',
    categorias: [
      { id: 'c1', nombre: 'Peso Pluma', pesoMin: 55, pesoMax: 60, modalidad: 'K1', genero: 'MASCULINO', cupos: 8, inscritos: 5 },
      { id: 'c2', nombre: 'Peso Ligero', pesoMin: 60, pesoMax: 67, modalidad: 'K1', genero: 'MASCULINO', cupos: 8, inscritos: 6 },
      { id: 'c3', nombre: 'Peso Welter', pesoMin: 67, pesoMax: 75, modalidad: 'K1', genero: 'MASCULINO', cupos: 8, inscritos: 4 },
      { id: 'c4', nombre: 'Peso Medio', pesoMin: 75, pesoMax: 83, modalidad: 'K1', genero: 'MASCULINO', cupos: 8, inscritos: 3 },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    inscripcionesAbiertas: true,
    fechaLimiteInscripcion: '2024-12-10',
    peleadores: 18,
    fechaAprobacion: '2024-11-15',
    aprobadoPor: '10',
  },
  {
    id: '2',
    nombre: 'Paris Fight Night',
    descripcion: 'Una noche de combates espectaculares en la ciudad de la luz.',
    fecha: '2024-12-20',
    horaInicio: '20:00',
    ciudad: 'París',
    pais: 'Francia',
    direccion: 'AccorHotels Arena',
    promotorId: '8',
    promotorNombre: 'European Championship',
    estado: 'INSCRIPCIONES_ABIERTAS',
    categorias: [
      { id: 'c5', nombre: 'Peso Ligero', pesoMin: 60, pesoMax: 67, modalidad: 'MUAY_THAI', genero: 'MASCULINO', cupos: 8, inscritos: 7 },
      { id: 'c6', nombre: 'Peso Femenino', pesoMin: 55, pesoMax: 63, modalidad: 'MUAY_THAI', genero: 'FEMENINO', cupos: 4, inscritos: 3 },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800',
    inscripcionesAbiertas: true,
    fechaLimiteInscripcion: '2024-12-15',
    peleadores: 10,
    fechaAprobacion: '2024-11-18',
    aprobadoPor: '10',
  },
  {
    id: '3',
    nombre: 'Barcelona Warriors',
    descripcion: 'Los guerreros más feroces se enfrentan en Barcelona.',
    fecha: '2024-12-28',
    horaInicio: '19:00',
    ciudad: 'Barcelona',
    pais: 'España',
    direccion: 'Palau Sant Jordi',
    promotorId: '8',
    promotorNombre: 'European Championship',
    estado: 'PUBLICADO',
    categorias: [
      { id: 'c7', nombre: 'Peso Pluma', pesoMin: 55, pesoMax: 60, modalidad: 'MUAY_THAI', genero: 'MASCULINO', cupos: 8, inscritos: 0 },
      { id: 'c8', nombre: 'Peso Ligero', pesoMin: 60, pesoMax: 67, modalidad: 'MUAY_THAI', genero: 'MASCULINO', cupos: 8, inscritos: 0 },
      { id: 'c9', nombre: 'Peso Medio', pesoMin: 67, pesoMax: 75, modalidad: 'K1', genero: 'MASCULINO', cupos: 8, inscritos: 0 },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    inscripcionesAbiertas: false,
    fechaLimiteInscripcion: '2024-12-20',
    peleadores: 0,
    fechaAprobacion: '2024-11-20',
    aprobadoPor: '11',
  },
  {
    id: '4',
    nombre: 'Milano Fight Fest',
    descripcion: 'El festival de artes marciales más grande de Italia.',
    fecha: '2025-01-10',
    horaInicio: '17:00',
    ciudad: 'Milán',
    pais: 'Italia',
    direccion: 'Mediolanum Forum',
    promotorId: '9',
    promotorNombre: 'Spanish Fight League',
    estado: 'BORRADOR',
    categorias: [
      { id: 'c10', nombre: 'Peso Pesado', pesoMin: 83, pesoMax: 100, modalidad: 'K1', genero: 'MASCULINO', cupos: 8, inscritos: 0 },
    ],
    inscripcionesAbiertas: false,
    peleadores: 0,
  },
  // Eventos pendientes de aprobación
  {
    id: '5',
    nombre: 'Valencia Combat Night',
    descripcion: 'La noche de combate más esperada en Valencia con los mejores peleadores nacionales.',
    fecha: '2025-01-25',
    horaInicio: '19:30',
    ciudad: 'Valencia',
    pais: 'España',
    direccion: 'Pabellón Fuente de San Luis',
    promotorId: '7',
    promotorNombre: 'Fight Night Madrid',
    estado: 'PENDIENTE_APROBACION',
    categorias: [
      { id: 'c11', nombre: 'Peso Ligero', pesoMin: 60, pesoMax: 67, modalidad: 'MUAY_THAI', genero: 'MASCULINO', cupos: 8, inscritos: 0 },
      { id: 'c12', nombre: 'Peso Welter', pesoMin: 67, pesoMax: 75, modalidad: 'K1', genero: 'MASCULINO', cupos: 8, inscritos: 0 },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    inscripcionesAbiertas: false,
    fechaLimiteInscripcion: '2025-01-20',
    peleadores: 0,
  },
  {
    id: '6',
    nombre: 'Sevilla Fight Championship',
    descripcion: 'El campeonato andaluz de kickboxing y muay thai.',
    fecha: '2025-02-08',
    horaInicio: '18:00',
    ciudad: 'Sevilla',
    pais: 'España',
    direccion: 'Palacio de Deportes San Pablo',
    promotorId: '9',
    promotorNombre: 'Spanish Fight League',
    estado: 'PENDIENTE_APROBACION',
    categorias: [
      { id: 'c13', nombre: 'Peso Pluma', pesoMin: 55, pesoMax: 60, modalidad: 'K1', genero: 'MASCULINO', cupos: 8, inscritos: 0 },
      { id: 'c14', nombre: 'Peso Medio', pesoMin: 75, pesoMax: 83, modalidad: 'MUAY_THAI', genero: 'MASCULINO', cupos: 8, inscritos: 0 },
      { id: 'c15', nombre: 'Peso Femenino', pesoMin: 52, pesoMax: 58, modalidad: 'MUAY_THAI', genero: 'FEMENINO', cupos: 4, inscritos: 0 },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800',
    inscripcionesAbiertas: false,
    fechaLimiteInscripcion: '2025-02-01',
    peleadores: 0,
  },
  {
    id: '7',
    nombre: 'Bilbao Fight Gala',
    descripcion: 'Gran gala de artes marciales en el norte de España.',
    fecha: '2025-02-15',
    horaInicio: '20:00',
    ciudad: 'Bilbao',
    pais: 'España',
    direccion: 'Bilbao Arena',
    promotorId: '8',
    promotorNombre: 'European Championship',
    estado: 'PENDIENTE_APROBACION',
    categorias: [
      { id: 'c16', nombre: 'Peso Ligero', pesoMin: 60, pesoMax: 67, modalidad: 'K1', genero: 'MASCULINO', cupos: 8, inscritos: 0 },
    ],
    imagenUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    inscripcionesAbiertas: false,
    fechaLimiteInscripcion: '2025-02-10',
    peleadores: 0,
  },
];

// Mock de inscripciones
export const mockInscripciones: Inscripcion[] = [
  {
    id: 'ins1',
    eventoId: '1',
    peleadorId: '1',
    managerId: '4',
    peso: '70kg',
    modalidad: 'K1',
    estado: 'ACEPTADA',
    fechaInscripcion: '2024-11-20',
  },
  {
    id: 'ins2',
    eventoId: '1',
    peleadorId: '2',
    managerId: '5',
    peso: '75kg',
    modalidad: 'K1',
    estado: 'ACEPTADA',
    fechaInscripcion: '2024-11-21',
  },
  {
    id: 'ins3',
    eventoId: '2',
    peleadorId: '3',
    managerId: '6',
    peso: '58kg',
    modalidad: 'MUAY_THAI',
    estado: 'PENDIENTE',
    fechaInscripcion: '2024-11-25',
  },
];

// Mock de combates
export const mockCombates: Combate[] = [
  {
    id: 'comb1',
    eventoId: '1',
    peleador1Id: '1',
    peleador2Id: '4',
    peleador1Nombre: 'Carlos Martínez',
    peleador2Nombre: 'Marco Rossi',
    categoriaId: 'c3',
    peso: '75kg',
    modalidad: 'K1',
    estado: 'PROGRAMADO',
  },
  {
    id: 'comb2',
    eventoId: '1',
    peleador1Id: '2',
    peleador2Id: '8',
    peleador1Nombre: 'Ahmed Hassan',
    peleador2Nombre: 'Pietro Lombardi',
    categoriaId: 'c4',
    peso: '77kg',
    modalidad: 'K1',
    estado: 'PROGRAMADO',
  },
];

// Highlights - Momentos destacados
export const mockHighlights: Highlight[] = [
  {
    id: '1',
    titulo: '¡KO Espectacular!',
    descripcion: 'Carlos "El Toro" Martínez consigue un KO en el primer round',
    peleador: 'Carlos Martínez',
    peleadorFoto: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400',
    imagenUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800',
    tipo: 'KO',
    fecha: '2024-11-20',
    views: 15420,
    likes: 892,
  },
  {
    id: '2',
    titulo: '¡Nuevo Campeón Europeo!',
    descripcion: 'Laura "La Reina" García se corona campeona de Europa',
    peleador: 'Laura García',
    peleadorFoto: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400',
    imagenUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    tipo: 'CAMPEONATO',
    fecha: '2024-11-18',
    views: 23150,
    likes: 1543,
  },
  {
    id: '3',
    titulo: 'Racha de 10 Victorias',
    descripcion: 'Miguel "Thunder" Silva extiende su racha invicta a 10 combates',
    peleador: 'Miguel Silva',
    peleadorFoto: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    imagenUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    tipo: 'RACHA',
    fecha: '2024-11-15',
    views: 8920,
    likes: 634,
  },
  {
    id: '4',
    titulo: 'Victoria Dominante',
    descripcion: 'Ana "La Pantera" López gana por decisión unánime',
    peleador: 'Ana López',
    peleadorFoto: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    imagenUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    tipo: 'VICTORIA',
    fecha: '2024-11-12',
    views: 5670,
    likes: 421,
  },
];

// Noticias - Artículos de eventos
export const mockNoticias: Noticia[] = [
  {
    id: '1',
    titulo: 'Madrid Fight Night anuncia cartelera estelar para diciembre',
    descripcion: 'El evento más esperado del año contará con 16 combates profesionales',
    contenido: 'El promotor Fight Night Madrid ha confirmado una cartelera espectacular para el 15 de diciembre...',
    imagenUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    categoria: 'EVENTO',
    fecha: '2024-11-22',
    autor: 'Redacción Fight News',
    leido: false,
  },
  {
    id: '2',
    titulo: 'Análisis: Los 5 mejores KOs de noviembre',
    descripcion: 'Repasamos los nocauts más impresionantes del mes',
    contenido: 'Noviembre nos dejó momentos espectaculares dentro del ring. Aquí destacamos los 5 KOs más impactantes...',
    imagenUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800',
    categoria: 'RESULTADO',
    fecha: '2024-11-21',
    autor: 'Carlos Deportes',
    leido: false,
  },
  {
    id: '3',
    titulo: 'Actualización del Ranking Europeo: Cambios en el Top 10',
    descripcion: 'Tres nuevos peleadores entran en la élite europea',
    contenido: 'El ranking europeo ha sufrido cambios significativos tras los resultados del último fin de semana...',
    imagenUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    categoria: 'RANKING',
    fecha: '2024-11-20',
    autor: 'Ranking Official',
    leido: false,
  },
  {
    id: '4',
    titulo: 'Entrevista exclusiva con Carlos "El Toro" Martínez',
    descripcion: '"Mi objetivo es ser campeón mundial en 2025"',
    contenido: 'Conversamos con el peleador español sobre sus planes futuros y su última victoria...',
    imagenUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    categoria: 'ENTREVISTA',
    fecha: '2024-11-19',
    autor: 'María Sports',
    leido: true,
  },
  {
    id: '5',
    titulo: 'Paris Fight Night confirma fecha para febrero 2025',
    descripcion: 'El evento francés regresa con una cartelera internacional',
    contenido: 'French Fighting League ha anunciado oficialmente la fecha de su próximo evento...',
    imagenUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
    categoria: 'EVENTO',
    fecha: '2024-11-18',
    autor: 'Fight News Europe',
    leido: true,
  },
];

// Generar ranking a partir de peleadores ordenados por Elo
export const mockRankings: Ranking[] = mockPeleadores
  .sort((a, b) => b.puntuacionElo - a.puntuacionElo)
  .map((peleador, index) => ({
    posicion: index + 1,
    peleador,
    puntos: peleador.puntuacionElo,
    tendencia: index % 3 === 0 ? 'up' : index % 3 === 1 ? 'down' : 'same',
    cambio: index % 3 === 0 ? Math.floor(Math.random() * 5) + 1 : index % 3 === 1 ? -(Math.floor(Math.random() * 3) + 1) : 0,
  }));

// Función helper para obtener peleador por ID
export const getPeleadorById = (id: string): Peleador | undefined => {
  return mockPeleadores.find((p) => p.id === id);
};

// Función helper para obtener ofertas de un peleador
export const getOfertasByPeleador = (peleadorId: string): Oferta[] => {
  return mockOfertas.filter((o) => o.peleador === peleadorId);
};

// Función helper para filtrar peleadores
export const filterPeleadores = (filters: {
  clase?: string;
  genero?: string;
  pais?: string;
  disponible?: boolean;
}): Peleador[] => {
  return mockPeleadores.filter((p) => {
    if (filters.clase && p.clase !== filters.clase) return false;
    if (filters.genero && p.genero !== filters.genero) return false;
    if (filters.pais && p.pais !== filters.pais) return false;
    if (filters.disponible !== undefined && p.disponible !== filters.disponible)
      return false;
    return true;
  });
};

// Función helper para obtener peleadores de un manager
export const getPeleadoresByManager = (managerId: string): Peleador[] => {
  const manager = mockUsuarios.find(u => u.id === managerId && u.rol === 'MANAGER');
  if (!manager?.peleadoresAsociados) return [];
  return mockPeleadores.filter(p => manager.peleadoresAsociados?.includes(p.id));
};

// Función helper para obtener eventos de un promotor
export const getEventosByPromotor = (promotorId: string): Evento[] => {
  return mockEventos.filter(e => e.promotorId === promotorId);
};

// Función helper para obtener eventos con inscripciones abiertas
export const getEventosDisponibles = (): Evento[] => {
  return mockEventos.filter(e => e.inscripcionesAbiertas && e.estado === 'INSCRIPCIONES_ABIERTAS');
};

// Función helper para obtener inscripciones de un peleador
export const getInscripcionesByPeleador = (peleadorId: string): Inscripcion[] => {
  return mockInscripciones.filter(i => i.peleadorId === peleadorId);
};

// Función helper para obtener inscripciones de un manager
export const getInscripcionesByManager = (managerId: string): Inscripcion[] => {
  return mockInscripciones.filter(i => i.managerId === managerId);
};
