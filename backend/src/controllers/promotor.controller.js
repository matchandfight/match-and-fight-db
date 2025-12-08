import Promotor from '../models/Promotor.model.js';
import Evento from '../models/Evento.model.js';
import OfertaCombate from '../models/OfertaCombate.model.js';

export const crearPromotor = async (req, res) => {
  try {
    req.body.user_id = req.user.id;
    const promotor = await Promotor.create(req.body);
    res.status(201).json({ success: true, data: promotor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerPromotores = async (req, res) => {
  try {
    const promotores = await Promotor.find({ activo: true });
    res.json({ success: true, data: promotores });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerPromotorPorId = async (req, res) => {
  try {
    const promotor = await Promotor.findById(req.params.id).populate('user_id', 'nombre_completo email');
    if (!promotor) return res.status(404).json({ success: false, message: 'Promotor no encontrado' });
    res.json({ success: true, data: promotor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const actualizarPromotor = async (req, res) => {
  try {
    const promotor = await Promotor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: promotor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerEventosDelPromotor = async (req, res) => {
  try {
    const eventos = await Evento.find({ promotor_id: req.params.id }).sort('-fecha');
    res.json({ success: true, data: eventos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerOfertasDelPromotor = async (req, res) => {
  try {
    const ofertas = await OfertaCombate.find({ promotor_id: req.params.id }).populate('peleador_id', 'nombre alias');
    res.json({ success: true, data: ofertas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

