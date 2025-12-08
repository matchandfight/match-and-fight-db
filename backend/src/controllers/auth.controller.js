import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

// Generar JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Registro de usuario
// @route   POST /api/auth/registro
// @access  Público
export const registro = async (req, res) => {
  try {
    const { email, password, rol, nombre_completo, telefono } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({
        success: false,
        message: 'Este email ya está registrado'
      });
    }

    // Crear usuario
    const usuario = await User.create({
      email,
      password,
      rol,
      nombre_completo,
      telefono
    });

    // Generar token
    const token = generarToken(usuario._id);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        id: usuario._id,
        email: usuario.email,
        rol: usuario.rol,
        nombre_completo: usuario.nombre_completo,
        token
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario',
      error: error.message
    });
  }
};

// @desc    Login de usuario
// @route   POST /api/auth/login
// @access  Público
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar datos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor proporciona email y contraseña'
      });
    }

    // Buscar usuario (incluir password)
    const usuario = await User.findOne({ email }).select('+password');

    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const passwordCorrecto = await usuario.compararPassword(password);

    if (!passwordCorrecto) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar que la cuenta esté activa
    if (!usuario.activo) {
      return res.status(401).json({
        success: false,
        message: 'Tu cuenta ha sido desactivada'
      });
    }

    // Actualizar último acceso
    usuario.ultimo_acceso = new Date();
    await usuario.save({ validateBeforeSave: false });

    // Generar token
    const token = generarToken(usuario._id);

    res.json({
      success: true,
      message: 'Login exitoso',
      data: {
        id: usuario._id,
        email: usuario.email,
        rol: usuario.rol,
        nombre_completo: usuario.nombre_completo,
        foto_perfil: usuario.foto_perfil,
        token
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      error: error.message
    });
  }
};

// @desc    Obtener perfil del usuario actual
// @route   GET /api/auth/perfil
// @access  Privado
export const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.user.id);

    res.json({
      success: true,
      data: usuario
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil',
      error: error.message
    });
  }
};

// @desc    Actualizar perfil
// @route   PUT /api/auth/perfil
// @access  Privado
export const actualizarPerfil = async (req, res) => {
  try {
    const camposPermitidos = ['nombre_completo', 'telefono', 'foto_perfil', 'notificaciones'];
    const actualizaciones = {};

    camposPermitidos.forEach(campo => {
      if (req.body[campo] !== undefined) {
        actualizaciones[campo] = req.body[campo];
      }
    });

    const usuario = await User.findByIdAndUpdate(
      req.user.id,
      actualizaciones,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: usuario
    });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar perfil',
      error: error.message
    });
  }
};

// @desc    Cambiar contraseña
// @route   PUT /api/auth/cambiar-password
// @access  Privado
export const cambiarPassword = async (req, res) => {
  try {
    const { passwordActual, passwordNuevo } = req.body;

    if (!passwordActual || !passwordNuevo) {
      return res.status(400).json({
        success: false,
        message: 'Proporciona la contraseña actual y la nueva'
      });
    }

    const usuario = await User.findById(req.user.id).select('+password');

    // Verificar contraseña actual
    const passwordCorrecto = await usuario.compararPassword(passwordActual);

    if (!passwordCorrecto) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña actual incorrecta'
      });
    }

    // Actualizar contraseña
    usuario.password = passwordNuevo;
    await usuario.save();

    res.json({
      success: true,
      message: 'Contraseña actualizada exitosamente'
    });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({
      success: false,
      message: 'Error al cambiar contraseña',
      error: error.message
    });
  }
};

