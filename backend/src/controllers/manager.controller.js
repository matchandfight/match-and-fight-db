import Manager from '../models/Manager.model.js';
import Peleador from '../models/Peleador.model.js';

export const crearManager = async (req, res) => {
  try {
    req.body.user_id = req.user.id;
    const manager = await Manager.create(req.body);
    res.status(201).json({ success: true, data: manager });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerManagers = async (req, res) => {
  try {
    const managers = await Manager.find({ activo: true }).populate('user_id', 'nombre_completo email');
    res.json({ success: true, data: managers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerManagerPorId = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id).populate('peleadores');
    if (!manager) return res.status(404).json({ success: false, message: 'Manager no encontrado' });
    res.json({ success: true, data: manager });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const actualizarManager = async (req, res) => {
  try {
    const manager = await Manager.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: manager });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const agregarPeleador = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id);
    const peleador = await Peleador.findById(req.params.peleadorId);
    
    if (!manager.peleadores.includes(peleador._id)) {
      manager.peleadores.push(peleador._id);
      peleador.manager_id = manager._id;
      await manager.save();
      await peleador.save();
    }
    
    res.json({ success: true, message: 'Peleador agregado al manager' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removerPeleador = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id);
    manager.peleadores = manager.peleadores.filter(p => p.toString() !== req.params.peleadorId);
    await manager.save();
    res.json({ success: true, message: 'Peleador removido del manager' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerPeleadoresDelManager = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id).populate('peleadores');
    res.json({ success: true, data: manager.peleadores });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

