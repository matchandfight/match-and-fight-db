import ResultadoCombate from '../models/ResultadoCombate.model.js';
import Peleador from '../models/Peleador.model.js';

export const crearResultado = async (req, res) => {
  try {
    req.body.reportado_por = req.user.id;
    const resultado = await ResultadoCombate.create(req.body);
    res.status(201).json({ success: true, data: resultado });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerResultados = async (req, res) => {
  try {
    const { peleador_id, evento_id, estado } = req.query;
    const filtro = {};
    
    if (peleador_id) {
      filtro.$or = [
        { peleador_ganador_id: peleador_id },
        { peleador_perdedor_id: peleador_id }
      ];
    }
    if (evento_id) filtro.evento_id = evento_id;
    if (estado) filtro.estado = estado;
    
    const resultados = await ResultadoCombate.find(filtro)
      .populate('peleador_ganador_id', 'nombre alias')
      .populate('peleador_perdedor_id', 'nombre alias')
      .sort('-fecha_combate');
    res.json({ success: true, data: resultados });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerResultadoPorId = async (req, res) => {
  try {
    const resultado = await ResultadoCombate.findById(req.params.id)
      .populate('peleador_ganador_id')
      .populate('peleador_perdedor_id')
      .populate('evento_id');
    if (!resultado) return res.status(404).json({ success: false, message: 'Resultado no encontrado' });
    res.json({ success: true, data: resultado });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reportarDesacuerdo = async (req, res) => {
  try {
    const resultado = await ResultadoCombate.findById(req.params.id);
    resultado.desacuerdo = true;
    resultado.desacuerdo_reportado_por = req.user.id;
    resultado.razon_desacuerdo = req.body.razon;
    resultado.estado = 'en_revision';
    await resultado.save();
    res.json({ success: true, message: 'Desacuerdo reportado' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const validarResultado = async (req, res) => {
  try {
    const resultado = await ResultadoCombate.findById(req.params.id);
    
    // Calcular cambios de Elo
    const ganador = await Peleador.findById(resultado.peleador_ganador_id);
    const perdedor = await Peleador.findById(resultado.peleador_perdedor_id);
    
    resultado.elo_anterior_ganador = ganador.puntuacion_elo;
    resultado.elo_anterior_perdedor = perdedor.puntuacion_elo;
    
    // Actualizar Elo (1 = victoria, 0 = derrota)
    ganador.actualizarElo(1, perdedor.puntuacion_elo);
    perdedor.actualizarElo(0, ganador.puntuacion_elo);
    
    resultado.cambio_elo_ganador = ganador.puntuacion_elo - resultado.elo_anterior_ganador;
    resultado.cambio_elo_perdedor = perdedor.puntuacion_elo - resultado.elo_anterior_perdedor;
    
    // Actualizar récord
    ganador.record.combates_totales++;
    ganador.record.ganados++;
    ganador.ultimo_combate = resultado.fecha_combate;
    
    perdedor.record.combates_totales++;
    perdedor.record.perdidos++;
    perdedor.ultimo_combate = resultado.fecha_combate;
    
    if (resultado.metodo === 'KO' || resultado.metodo === 'TKO') {
      ganador.record.ko_realizados++;
      perdedor.record.ko_recibidos++;
    }
    
    resultado.validado = true;
    resultado.validado_por = req.user.id;
    resultado.fecha_validacion = new Date();
    resultado.estado = 'validado';
    
    await resultado.save();
    await ganador.save();
    await perdedor.save();
    
    res.json({ success: true, message: 'Resultado validado y Elo actualizado', data: resultado });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const subirPrueba = async (req, res) => {
  try {
    const resultado = await ResultadoCombate.findById(req.params.id);
    resultado.pruebas.push({
      tipo: req.body.tipo,
      url: req.body.url,
      descripcion: req.body.descripcion,
      subido_por: req.user.id
    });
    await resultado.save();
    res.json({ success: true, data: resultado });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

