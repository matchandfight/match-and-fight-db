import OfertaCombate from '../models/OfertaCombate.model.js';

export const crearOferta = async (req, res) => {
  try {
    req.body.promotor_id = req.user.id;
    const oferta = await OfertaCombate.create(req.body);
    res.status(201).json({ success: true, data: oferta });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerOfertas = async (req, res) => {
  try {
    const { peleador_id, promotor_id, estado } = req.query;
    const filtro = {};
    
    if (peleador_id) filtro.peleador_id = peleador_id;
    if (promotor_id) filtro.promotor_id = promotor_id;
    if (estado) filtro.estado = estado;
    
    const ofertas = await OfertaCombate.find(filtro)
      .populate('peleador_id', 'nombre alias')
      .populate('promotor_id', 'nombre')
      .sort('-createdAt');
    res.json({ success: true, data: ofertas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerOfertasPendientes = async (req, res) => {
  try {
    const ofertas = await OfertaCombate.find({ 
      peleador_id: req.user.peleador_id, 
      estado: 'pendiente' 
    }).populate('promotor_id');
    res.json({ success: true, data: ofertas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerOfertaPorId = async (req, res) => {
  try {
    const oferta = await OfertaCombate.findById(req.params.id)
      .populate('peleador_id')
      .populate('promotor_id')
      .populate('oponente_propuesto');
    if (!oferta) return res.status(404).json({ success: false, message: 'Oferta no encontrada' });
    res.json({ success: true, data: oferta });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const responderOferta = async (req, res) => {
  try {
    const { estado, razon_rechazo } = req.body;
    const oferta = await OfertaCombate.findById(req.params.id);
    
    oferta.estado = estado;
    oferta.fecha_respuesta = new Date();
    if (razon_rechazo) oferta.razon_rechazo = razon_rechazo;
    
    await oferta.save();
    res.json({ success: true, data: oferta });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelarOferta = async (req, res) => {
  try {
    const oferta = await OfertaCombate.findByIdAndUpdate(
      req.params.id,
      { estado: 'cancelada' },
      { new: true }
    );
    res.json({ success: true, data: oferta });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const agregarMensaje = async (req, res) => {
  try {
    const oferta = await OfertaCombate.findById(req.params.id);
    oferta.mensajes.push({
      autor_id: req.user.id,
      texto: req.body.texto
    });
    await oferta.save();
    res.json({ success: true, data: oferta });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

