import Peleador from '../models/Peleador.model.js';

// @desc    Crear nuevo peleador
// @route   POST /api/peleadores
// @access  Privado (atleta, manager, admin)
export const crearPeleador = async (req, res) => {
  try {
    // Asociar el peleador con el usuario actual
    req.body.user_id = req.user.id;

    const peleador = await Peleador.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Peleador creado exitosamente',
      data: peleador
    });
  } catch (error) {
    console.error('Error al crear peleador:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear peleador',
      error: error.message
    });
  }
};

// @desc    Obtener todos los peleadores con filtros
// @route   GET /api/peleadores
// @access  Público
export const obtenerPeleadores = async (req, res) => {
  try {
    const {
      clase,
      peso_min,
      peso_max,
      pais,
      ciudad,
      genero,
      elo_min,
      elo_max,
      pagina = 1,
      limite = 20,
      orden = '-puntuacion_elo'
    } = req.query;

    // Construir filtro
    const filtro = { activo: true };

    if (clase) filtro.clase = clase;
    if (pais) filtro.pais = pais;
    if (ciudad) filtro.ciudad = new RegExp(ciudad, 'i');
    if (genero) filtro.genero = genero;

    if (peso_min || peso_max) {
      filtro.peso = {};
      if (peso_min) filtro.peso.$gte = Number(peso_min);
      if (peso_max) filtro.peso.$lte = Number(peso_max);
    }

    if (elo_min || elo_max) {
      filtro.puntuacion_elo = {};
      if (elo_min) filtro.puntuacion_elo.$gte = Number(elo_min);
      if (elo_max) filtro.puntuacion_elo.$lte = Number(elo_max);
    }

    // Paginación
    const skip = (Number(pagina) - 1) * Number(limite);

    const peleadores = await Peleador.find(filtro)
      .sort(orden)
      .limit(Number(limite))
      .skip(skip)
      .select('-bolsa_minima'); // No mostrar bolsa mínima públicamente

    const total = await Peleador.countDocuments(filtro);

    res.json({
      success: true,
      data: peleadores,
      paginacion: {
        total,
        pagina: Number(pagina),
        limite: Number(limite),
        paginas: Math.ceil(total / Number(limite))
      }
    });
  } catch (error) {
    console.error('Error al obtener peleadores:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener peleadores',
      error: error.message
    });
  }
};

// @desc    Obtener peleador por ID
// @route   GET /api/peleadores/:id
// @access  Público
export const obtenerPeleadorPorId = async (req, res) => {
  try {
    const peleador = await Peleador.findById(req.params.id)
      .populate('user_id', 'email nombre_completo')
      .populate('manager_id', 'nombre contacto');

    if (!peleador) {
      return res.status(404).json({
        success: false,
        message: 'Peleador no encontrado'
      });
    }

    // Si no es el propietario o manager, ocultar bolsa mínima
    const esPropietario = req.user && req.user.id === peleador.user_id._id.toString();
    const esManager = req.user && peleador.manager_id && req.user.id === peleador.manager_id.user_id?.toString();

    if (!esPropietario && !esManager) {
      peleador.bolsa_minima = undefined;
    }

    res.json({
      success: true,
      data: peleador
    });
  } catch (error) {
    console.error('Error al obtener peleador:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener peleador',
      error: error.message
    });
  }
};

// @desc    Actualizar peleador
// @route   PUT /api/peleadores/:id
// @access  Privado
export const actualizarPeleador = async (req, res) => {
  try {
    const peleador = await Peleador.findById(req.params.id);

    if (!peleador) {
      return res.status(404).json({
        success: false,
        message: 'Peleador no encontrado'
      });
    }

    // Verificar permisos
    const esPropietario = req.user.id === peleador.user_id.toString();
    const esAdmin = req.user.rol === 'admin';

    if (!esPropietario && !esAdmin) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para actualizar este perfil'
      });
    }

    const peleadorActualizado = await Peleador.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Peleador actualizado exitosamente',
      data: peleadorActualizado
    });
  } catch (error) {
    console.error('Error al actualizar peleador:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar peleador',
      error: error.message
    });
  }
};

// @desc    Eliminar peleador
// @route   DELETE /api/peleadores/:id
// @access  Privado
export const eliminarPeleador = async (req, res) => {
  try {
    const peleador = await Peleador.findById(req.params.id);

    if (!peleador) {
      return res.status(404).json({
        success: false,
        message: 'Peleador no encontrado'
      });
    }

    // Verificar permisos
    const esPropietario = req.user.id === peleador.user_id.toString();
    const esAdmin = req.user.rol === 'admin';

    if (!esPropietario && !esAdmin) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para eliminar este perfil'
      });
    }

    // Desactivar en lugar de eliminar
    peleador.activo = false;
    await peleador.save();

    res.json({
      success: true,
      message: 'Peleador desactivado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar peleador:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar peleador',
      error: error.message
    });
  }
};

// @desc    Actualizar disponibilidad
// @route   PUT /api/peleadores/:id/disponibilidad
// @access  Privado
export const actualizarDisponibilidad = async (req, res) => {
  try {
    const peleador = await Peleador.findById(req.params.id);

    if (!peleador) {
      return res.status(404).json({
        success: false,
        message: 'Peleador no encontrado'
      });
    }

    peleador.disponibilidad = req.body.disponibilidad;
    await peleador.save();

    res.json({
      success: true,
      message: 'Disponibilidad actualizada',
      data: peleador.disponibilidad
    });
  } catch (error) {
    console.error('Error al actualizar disponibilidad:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar disponibilidad',
      error: error.message
    });
  }
};

// @desc    Obtener disponibilidad
// @route   GET /api/peleadores/:id/disponibilidad
// @access  Público
export const obtenerDisponibilidad = async (req, res) => {
  try {
    const peleador = await Peleador.findById(req.params.id).select('disponibilidad');

    if (!peleador) {
      return res.status(404).json({
        success: false,
        message: 'Peleador no encontrado'
      });
    }

    res.json({
      success: true,
      data: peleador.disponibilidad
    });
  } catch (error) {
    console.error('Error al obtener disponibilidad:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener disponibilidad',
      error: error.message
    });
  }
};

