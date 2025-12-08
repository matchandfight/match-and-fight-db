import Peleador from '../models/Peleador.model.js';
import ResultadoCombate from '../models/ResultadoCombate.model.js';

export const obtenerRankingGlobal = async (req, res) => {
  try {
    const { clase, genero, peso_categoria, limite = 50 } = req.query;
    const filtro = { activo: true };
    
    if (clase) filtro.clase = clase;
    if (genero) filtro.genero = genero;
    if (peso_categoria) {
      const rangos = {
        'minimosca': [0, 49],
        'mosca': [49, 52],
        'gallo': [52, 56],
        'pluma': [56, 60],
        'ligero': [60, 64],
        'welter': [64, 69],
        'medio': [69, 75],
        'semipesado': [75, 85],
        'pesado': [85, 999]
      };
      if (rangos[peso_categoria]) {
        filtro.peso = { $gte: rangos[peso_categoria][0], $lt: rangos[peso_categoria][1] };
      }
    }
    
    const ranking = await Peleador.find(filtro)
      .sort('-puntuacion_elo')
      .limit(Number(limite))
      .select('nombre alias clase peso puntuacion_elo record pais ciudad foto_url');
    
    res.json({ success: true, data: ranking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerRankingPorPais = async (req, res) => {
  try {
    const { pais } = req.params;
    const { clase, genero, limite = 50 } = req.query;
    const filtro = { activo: true, pais };
    
    if (clase) filtro.clase = clase;
    if (genero) filtro.genero = genero;
    
    const ranking = await Peleador.find(filtro)
      .sort('-puntuacion_elo')
      .limit(Number(limite))
      .select('nombre alias clase peso puntuacion_elo record ciudad foto_url');
    
    res.json({ success: true, data: ranking, pais });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerRankingPorRegion = async (req, res) => {
  try {
    const { region } = req.params;
    const paises = {
      'europa': ['España', 'Francia', 'Italia', 'Alemania', 'Reino Unido', 'Portugal'],
      'iberica': ['España', 'Portugal']
    };
    
    const filtro = { 
      activo: true,
      pais: { $in: paises[region.toLowerCase()] || [] }
    };
    
    const ranking = await Peleador.find(filtro)
      .sort('-puntuacion_elo')
      .limit(100)
      .select('nombre alias clase peso puntuacion_elo record pais ciudad foto_url');
    
    res.json({ success: true, data: ranking, region });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const obtenerHistorialPeleador = async (req, res) => {
  try {
    const { peleadorId } = req.params;
    
    const resultados = await ResultadoCombate.find({
      $or: [
        { peleador_ganador_id: peleadorId },
        { peleador_perdedor_id: peleadorId }
      ],
      validado: true
    })
      .populate('peleador_ganador_id', 'nombre alias')
      .populate('peleador_perdedor_id', 'nombre alias')
      .populate('evento_id', 'nombre fecha ciudad')
      .sort('-fecha_combate');
    
    res.json({ success: true, data: resultados });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const recalcularRankings = async (req, res) => {
  try {
    // Aplicar penalizaciones por inactividad a todos los peleadores
    const peleadores = await Peleador.find({ activo: true });
    
    let actualizados = 0;
    for (const peleador of peleadores) {
      const penalizacion = peleador.aplicarPenalizacionInactividad();
      if (penalizacion > 0) {
        await peleador.save();
        actualizados++;
      }
    }
    
    res.json({ 
      success: true, 
      message: `Rankings recalculados. ${actualizados} peleadores penalizados por inactividad.`,
      actualizados 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

