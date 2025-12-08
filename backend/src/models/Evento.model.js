import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del evento es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  
  // Organizador
  promotor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotor',
    required: true
  },
  
  // Fecha y ubicación
  fecha: {
    type: Date,
    required: [true, 'La fecha del evento es obligatoria']
  },
  hora: String,
  pais: {
    type: String,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  direccion: String,
  venue: String, // Nombre del lugar/recinto
  
  // Información adicional
  disciplina: {
    type: String,
    enum: ['Muay Thai', 'K1', 'Boxeo', 'MMA', 'Kickboxing', 'Otro'],
    default: 'Muay Thai'
  },
  categoria: {
    type: String,
    enum: ['Amateur', 'Semi-Profesional', 'Profesional'],
    default: 'Amateur'
  },
  
  // Combates programados
  combates: [{
    peleador_1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Peleador'
    },
    peleador_2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Peleador'
    },
    peso_pactado: Number,
    rondas: Number,
    es_titulo: { type: Boolean, default: false },
    titulo: String,
    orden: Number, // Orden en la cartelera
    resultado_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ResultadoCombate'
    }
  }],
  
  // Peleadores participantes (lista plana)
  peleadores_participantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Peleador'
  }],
  
  // Medios y promoción
  imagen_poster: String,
  video_promocional: String,
  link_externo: String, // Link a página externa del evento
  link_streaming: String,
  link_venta_entradas: String,
  
  // Visibilidad y promoción
  promocion: {
    destacado: { type: Boolean, default: false },
    banner: { type: Boolean, default: false },
    fecha_inicio_promocion: Date,
    fecha_fin_promocion: Date
  },
  
  // Estado
  estado: {
    type: String,
    enum: ['borrador', 'programado', 'en_curso', 'finalizado', 'cancelado'],
    default: 'borrador'
  },
  publicado: {
    type: Boolean,
    default: false
  },
  
  // Estadísticas
  visualizaciones: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Índices
eventoSchema.index({ fecha: -1 });
eventoSchema.index({ promotor_id: 1, fecha: -1 });
eventoSchema.index({ pais: 1, ciudad: 1, fecha: -1 });
eventoSchema.index({ estado: 1, fecha: -1 });

// Virtual para verificar si el evento ya pasó
eventoSchema.virtual('es_pasado').get(function() {
  return this.fecha < new Date();
});

// Virtual para días hasta el evento
eventoSchema.virtual('dias_hasta_evento').get(function() {
  const diff = this.fecha - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

eventoSchema.set('toJSON', { virtuals: true });
eventoSchema.set('toObject', { virtuals: true });

const Evento = mongoose.model('Evento', eventoSchema);

export default Evento;

