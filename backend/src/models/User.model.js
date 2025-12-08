import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false // No incluir password en consultas por defecto
  },
  rol: {
    type: String,
    enum: ['atleta', 'manager', 'promotor', 'admin'],
    required: true,
    default: 'atleta'
  },
  nombre_completo: {
    type: String,
    required: [true, 'El nombre completo es obligatorio']
  },
  telefono: {
    type: String
  },
  foto_perfil: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  
  // Estado de la cuenta
  activo: {
    type: Boolean,
    default: true
  },
  verificado: {
    type: Boolean,
    default: false
  },
  
  // Suscripción (para managers y promotores)
  suscripcion: {
    tipo: {
      type: String,
      enum: ['gratuita', 'basica', 'profesional', 'premium'],
      default: 'gratuita'
    },
    fecha_inicio: Date,
    fecha_fin: Date,
    activa: {
      type: Boolean,
      default: false
    }
  },
  
  // Preferencias de notificación
  notificaciones: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    sms: { type: Boolean, default: false }
  },
  
  // Token para recuperación de contraseña
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
  // Token para verificación de email
  verificationToken: String,
  
  // Última actividad
  ultimo_acceso: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índices
userSchema.index({ email: 1 });
userSchema.index({ rol: 1 });

// Encriptar contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
userSchema.methods.compararPassword = async function(passwordIngresado) {
  return await bcrypt.compare(passwordIngresado, this.password);
};

// Método para verificar si tiene suscripción activa
userSchema.methods.tieneSuscripcionActiva = function() {
  if (!this.suscripcion.activa) return false;
  if (!this.suscripcion.fecha_fin) return false;
  return new Date() < this.suscripcion.fecha_fin;
};

// Virtual para tipo de cuenta
userSchema.virtual('tipo_cuenta').get(function() {
  if (this.tieneSuscripcionActiva()) {
    return this.suscripcion.tipo;
  }
  return 'gratuita';
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = mongoose.model('User', userSchema);

export default User;

