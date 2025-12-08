import express from 'express';
import {
  obtenerRankingGlobal,
  obtenerRankingPorPais,
  obtenerRankingPorRegion,
  obtenerHistorialPeleador,
  recalcularRankings
} from '../controllers/ranking.controller.js';
import { protegerRuta, autorizarRoles } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas públicas
router.get('/global', obtenerRankingGlobal);
router.get('/pais/:pais', obtenerRankingPorPais);
router.get('/region/:region', obtenerRankingPorRegion);
router.get('/historial/:peleadorId', obtenerHistorialPeleador);

// Rutas administrativas
router.post('/recalcular', protegerRuta, autorizarRoles('admin'), recalcularRankings);

export default router;

