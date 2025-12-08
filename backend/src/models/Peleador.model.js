import mongoose from 'mongoose';

const peleadorSchema = new mongoose.Schema({
  // Datos personales
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  alias: {
    type: String,
    trim: true
  },
  fecha_nacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es obligatoria']
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'],
    required: true
  },
  
  // Clasificación deportiva
  clase: {
    type: String,
    enum: ['N', 'C', 'B', 'A'],
    required: [true, 'La clase es obligatoria'],
    default: 'N'
  },
  peso: {
    type: Number,
    required: [true, 'El peso es obligatorio']
  },
  altura: {
    type: Number,
    required: [true, 'La altura es obligatoria']
  },
  
  // Ubicación
  pais: {
    type: String,
    required: [true, 'El país es obligatorio']
  },
  ciudad: {
    type: String,
    required: [true, 'La ciudad es obligatoria']
  },
  club: {
    type: String,
    required: [true, 'El club es obligatorio']
  },
  aeropuerto_cercano: {
    type: String
  },
  
  // Redes sociales y medios
  redes_sociales: [{
    plataforma: String, // Instagram, Facebook, TikTok, etc.
    url: String
  }],
  foto_url: {
    type: String,
    required: [true, 'La foto de perfil es obligatoria']
  },
  videos_url: [String],
  
  // Récord deportivo
  record: {
    combates_totales: { type: Number, default: 0 },
    ganados: { type: Number, default: 0 },
    perdidos: { type: Number, default: 0 },
    ko_realizados: { type: Number, default: 0 },
    ko_recibidos: { type: Number, default: 0 }
  },
  
  // Sistema de puntuación
  puntuacion_elo: {
    type: Number,
    default: 1000 // Puntuación inicial
  },
  experiencia: {
    type: Number,
    default: 0 // Años activos o número de combates
  },
  ultimo_combate: {
    type: Date,
    default: null
  },
  
  // Disponibilidad
  disponibilidad: [{
    fecha_inicio: Date,
    fecha_fin: Date,
    disponible: Boolean
  }],
  bolsa_minima: {
    type: Number,
    default: 0 // Privado, solo visible para atleta/manager
  },
  
  // Relaciones
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  manager_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager'
  },
  
  // Estado
  activo: {
    type: Boolean,
    default: true
  },
  verificado: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Índices
peleadorSchema.index({ puntuacion_elo: -1 });
peleadorSchema.index({ pais: 1, puntuacion_elo: -1 });
peleadorSchema.index({ clase: 1, peso: 1 });
peleadorSchema.index({ user_id: 1 });

// Virtual para calcular edad
peleadorSchema.virtual('edad').get(function() {
  if (!this.fecha_nacimiento) return null;
  const diff = Date.now() - this.fecha_nacimiento.getTime();
  const edad = new Date(diff);
  return Math.abs(edad.getUTCFullYear() - 1970);
});

// Virtual para días sin pelear
peleadorSchema.virtual('dias_sin_pelear').get(function() {
  if (!this.ultimo_combate) return null;
  const diff = Date.now() - this.ultimo_combate.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
});

// Método para actualizar Elo
peleadorSchema.methods.actualizarElo = function(resultado, eloOponente, K = 32) {
  // Expectativa de resultado
  const expectativa = 1 / (1 + Math.pow(10, (eloOponente - this.puntuacion_elo) / 400));
  
  // Nueva puntuación
  const nuevaElo = this.puntuacion_elo + K * (resultado - expectativa);
  
  this.puntuacion_elo = Math.round(nuevaElo);
  return this.puntuacion_elo;
};

// Método para aplicar penalización por inactividad
peleadorSchema.methods.aplicarPenalizacionInactividad = function() {
  const diasSinPelear = this.dias_sin_pelear;
  
  if (!diasSinPelear || diasSinPelear < 180) return 0; // Sin penalización si < 6 meses
  
  // Penalización progresiva
  let penalizacion = 0;
  if (diasSinPelear >= 180 && diasSinPelear < 365) {
    penalizacion = 10; // -10 puntos
  } else if (diasSinPelear >= 365 && diasSinPelear < 730) {
    penalizacion = 30; // -30 puntos
  } else if (diasSinPelear >= 730) {
    penalizacion = 60; // -60 puntos
  }
  
  this.puntuacion_elo = Math.max(800, this.puntuacion_elo - penalizacion);
  return penalizacion;
};

// Configurar virtuals en JSON
peleadorSchema.set('toJSON', { virtuals: true });
peleadorSchema.set('toObject', { virtuals: true });

const Peleador = mongoose.model('Peleador', peleadorSchema);

export default Peleador;

