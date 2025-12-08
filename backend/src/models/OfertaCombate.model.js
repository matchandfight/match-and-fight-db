import mongoose from 'mongoose';

const ofertaCombateSchema = new mongoose.Schema({
  // Quien hace la oferta
  promotor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotor',
    required: true
  },
  evento_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evento'
  },
  
  // A quien se hace la oferta
  peleador_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Peleador',
    required: true
  },
  manager_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager'
  },
  
  // Detalles del combate propuesto
  fecha_combate: {
    type: Date,
    required: true
  },
  ciudad: String,
  pais: String,
  
  // Oponente (si ya está definido)
  oponente_propuesto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Peleador'
  },
  
  // Condiciones técnicas
  condiciones: {
    peso_min: Number,
    peso_max: Number,
    rondas: {
      type: Number,
      default: 3
    },
    duracion_ronda: {
      type: Number,
      default: 3 // minutos
    },
    tipo_guantes: String, // Ej: 10oz, 8oz
    normativa: String // Ej: WAKO, IFMA
  },
  
  // Condiciones económicas (solo visible para peleador/manager)
  bolsa_ofrecida: {
    type: Number,
    required: true
  },
  gastos_incluidos: {
    viaje: { type: Boolean, default: false },
    alojamiento: { type: Boolean, default: false },
    comida: { type: Boolean, default: false }
  },
  
  // Estado de la oferta
  estado: {
    type: String,
    enum: ['pendiente', 'aceptada', 'rechazada', 'negociacion', 'cancelada', 'expirada'],
    default: 'pendiente'
  },
  fecha_respuesta: Date,
  razon_rechazo: String,
  
  // Comunicación
  mensajes: [{
    autor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    texto: String,
    fecha: {
      type: Date,
      default: Date.now
    },
    leido: {
      type: Boolean,
      default: false
    }
  }],
  
  // Notas internas
  notas_promotor: String,
  notas_peleador: String,
  
  // Expiración
  fecha_expiracion: {
    type: Date,
    default: () => new Date(+new Date() + 7*24*60*60*1000) // 7 días por defecto
  }
}, {
  timestamps: true
});

// Índices
ofertaCombateSchema.index({ promotor_id: 1, estado: 1 });
ofertaCombateSchema.index({ peleador_id: 1, estado: 1 });
ofertaCombateSchema.index({ estado: 1, fecha_combate: 1 });
ofertaCombateSchema.index({ fecha_expiracion: 1 });

// Virtual para verificar si está expirada
ofertaCombateSchema.virtual('esta_expirada').get(function() {
  return this.fecha_expiracion < new Date() && this.estado === 'pendiente';
});

// Método para verificar antes de guardar
ofertaCombateSchema.pre('save', function(next) {
  // Si está expirada y aún está pendiente, cambiar a expirada
  if (this.esta_expirada) {
    this.estado = 'expirada';
  }
  next();
});

ofertaCombateSchema.set('toJSON', { virtuals: true });
ofertaCombateSchema.set('toObject', { virtuals: true });

const OfertaCombate = mongoose.model('OfertaCombate', ofertaCombateSchema);

export default OfertaCombate;

