import mongoose from 'mongoose';

const promotorSchema = new mongoose.Schema({
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
  nombre_empresa: String,
  
  // Contacto
  contacto: {
    email: { type: String, required: true },
    telefono: String,
    web: String
  },
  
  // Ubicación principal
  pais: {
    type: String,
    required: true
  },
  ciudad: String,
  
  // Información profesional
  licencia: String,
  años_experiencia: {
    type: Number,
    default: 0
  },
  descripcion: String,
  
  // Eventos
  eventos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evento'
  }],
  
  // Estadísticas
  estadisticas: {
    total_eventos: { type: Number, default: 0 },
    ofertas_enviadas: { type: Number, default: 0 },
    ofertas_aceptadas: { type: Number, default: 0 },
    ofertas_rechazadas: { type: Number, default: 0 },
    tasa_aceptacion: { type: Number, default: 0 }
  },
  
  // Configuración
  filtros_preferidos: [{
    nombre: String,
    filtros: mongoose.Schema.Types.Mixed
  }],
  
  // Cuenta profesional
  cuenta_profesional: {
    type: Boolean,
    default: false
  },
  
  // Plan de suscripción
  plan: {
    tipo: {
      type: String,
      enum: ['gratuito', 'basico', 'profesional', 'premium'],
      default: 'gratuito'
    },
    eventos_mensuales: { type: Number, default: 1 },
    ofertas_mensuales: { type: Number, default: 10 }
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
promotorSchema.index({ user_id: 1 });
promotorSchema.index({ pais: 1, ciudad: 1 });

// Método para calcular tasa de aceptación
promotorSchema.methods.calcularTasaAceptacion = function() {
  const total = this.estadisticas.ofertas_enviadas;
  if (total === 0) return 0;
  
  const tasa = (this.estadisticas.ofertas_aceptadas / total) * 100;
  this.estadisticas.tasa_aceptacion = Math.round(tasa * 100) / 100;
  return this.estadisticas.tasa_aceptacion;
};

const Promotor = mongoose.model('Promotor', promotorSchema);

export default Promotor;

