import Evento from '../models/Evento.model.js';

export const crearEvento = async (req, res) => {
  try {
    req.body.promotor_id = req.user.id;
    const evento = await Evento.create(req.body);
    res.status(201).json({ success: true, data: evento });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerEventos = async (req, res) => {
  try {
    const { pais, ciudad, fecha_desde, fecha_hasta, estado } = req.query;
    const filtro = {};
    
    if (pais) filtro.pais = pais;
    if (ciudad) filtro.ciudad = new RegExp(ciudad, 'i');
    if (estado) filtro.estado = estado;
    if (fecha_desde || fecha_hasta) {
      filtro.fecha = {};
      if (fecha_desde) filtro.fecha.$gte = new Date(fecha_desde);
      if (fecha_hasta) filtro.fecha.$lte = new Date(fecha_hasta);
    }
    
    const eventos = await Evento.find(filtro).populate('promotor_id', 'nombre').sort('fecha');
    res.json({ success: true, data: eventos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerEventosProximos = async (req, res) => {
  try {
    const eventos = await Evento.find({
      fecha: { $gte: new Date() },
      publicado: true
    }).sort('fecha').limit(10);
    res.json({ success: true, data: eventos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerEventoPorId = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id)
      .populate('promotor_id')
      .populate('peleadores_participantes');
    if (!evento) return res.status(404).json({ success: false, message: 'Evento no encontrado' });
    res.json({ success: true, data: evento });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const actualizarEvento = async (req, res) => {
  try {
    const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: evento });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const eliminarEvento = async (req, res) => {
  try {
    await Evento.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Evento eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const agregarCombate = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    evento.combates.push(req.body);
    await evento.save();
    res.json({ success: true, data: evento });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

