import mongoose from 'mongoose';

const managerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  
  // Contacto
  contacto: {
    email: { type: String, required: true },
    telefono: String,
    whatsapp: String,
    telegram: String
  },
  
  // Peleadores gestionados
  peleadores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Peleador'
  }],
  
  // Información profesional
  empresa: String,
  licencia_profesional: String,
  años_experiencia: {
    type: Number,
    default: 0
  },
  
  // Estadísticas
  estadisticas: {
    total_peleadores: { type: Number, default: 0 },
    combates_gestionados: { type: Number, default: 0 },
    ofertas_aceptadas: { type: Number, default: 0 },
    ofertas_rechazadas: { type: Number, default: 0 }
  },
  
  // Configuración de búsqueda (filtros guardados)
  filtros_guardados: [{
    nombre: String,
    filtros: mongoose.Schema.Types.Mixed
  }],
  
  // Cuenta profesional
  cuenta_pro: {
    type: Boolean,
    default: false
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
managerSchema.index({ user_id: 1 });
managerSchema.index({ 'contacto.email': 1 });

// Middleware para actualizar contador de peleadores
managerSchema.pre('save', function(next) {
  if (this.isModified('peleadores')) {
    this.estadisticas.total_peleadores = this.peleadores.length;
  }
  next();
});

const Manager = mongoose.model('Manager', managerSchema);

export default Manager;

