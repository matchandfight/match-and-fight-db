import express from 'express';
import {
  crearPromotor,
  obtenerPromotores,
  obtenerPromotorPorId,
  actualizarPromotor,
  obtenerEventosDelPromotor,
  obtenerOfertasDelPromotor
} from '../controllers/promotor.controller.js';
import { protegerRuta, autorizarRoles } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', obtenerPromotores);
router.get('/:id', obtenerPromotorPorId);

// Rutas protegidas
router.post('/', protegerRuta, autorizarRoles('promotor', 'admin'), crearPromotor);
router.put('/:id', protegerRuta, autorizarRoles('promotor', 'admin'), actualizarPromotor);

// Eventos y ofertas del promotor
router.get('/:id/eventos', protegerRuta, obtenerEventosDelPromotor);
router.get('/:id/ofertas', protegerRuta, obtenerOfertasDelPromotor);

export default router;

