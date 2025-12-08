import mongoose from 'mongoose';

const resultadoCombateSchema = new mongoose.Schema({
  // Evento asociado
  evento_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evento',
    required: true
  },
  
  // Peleadores
  peleador_ganador_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Peleador',
    required: true
  },
  peleador_perdedor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Peleador',
    required: true
  },
  
  // Detalles del combate
  fecha_combate: {
    type: Date,
    required: true
  },
  peso_pactado: Number,
  rondas_peleadas: Number,
  
  // Resultado
  metodo: {
    type: String,
    enum: ['KO', 'TKO', 'Decision', 'Decision_Unanime', 'Decision_Dividida', 'Descalificacion', 'No_Contest', 'Empate'],
    required: true
  },
  ronda_finalizacion: Number, // En qué ronda terminó (si aplica)
  tiempo_finalizacion: String, // Ej: "2:45" del round 3
  
  // Detalles adicionales
  puntuacion_jueces: [{
    juez: String,
    puntos_ganador: Number,
    puntos_perdedor: Number
  }],
  
  // Reporte inicial
  reportado_por: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fecha_reporte: {
    type: Date,
    default: Date.now
  },
  
  // Validación
  desacuerdo: {
    type: Boolean,
    default: false
  },
  desacuerdo_reportado_por: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  razon_desacuerdo: String,
  
  // Pruebas
  pruebas: [{
    tipo: {
      type: String,
      enum: ['foto', 'video', 'acta', 'documento']
    },
    url: String,
    descripcion: String,
    subido_por: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    fecha_subida: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Validación administrativa
  validado: {
    type: Boolean,
    default: false
  },
  validado_por: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fecha_validacion: Date,
  notas_validacion: String,
  
  // Impacto en Elo
  cambio_elo_ganador: Number,
  cambio_elo_perdedor: Number,
  elo_anterior_ganador: Number,
  elo_anterior_perdedor: Number,
  
  // Estado
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'en_revision', 'validado', 'rechazado'],
    default: 'pendiente'
  },
  
  // Resumen y notas
  resumen: String,
  notas_adicionales: String
}, {
  timestamps: true
});

// Índices
resultadoCombateSchema.index({ evento_id: 1 });
resultadoCombateSchema.index({ peleador_ganador_id: 1, fecha_combate: -1 });
resultadoCombateSchema.index({ peleador_perdedor_id: 1, fecha_combate: -1 });
resultadoCombateSchema.index({ estado: 1 });
resultadoCombateSchema.index({ validado: 1 });

const ResultadoCombate = mongoose.model('ResultadoCombate', resultadoCombateSchema);

export default ResultadoCombate;

