import express from 'express';
import {
  crearPeleador,
  obtenerPeleadores,
  obtenerPeleadorPorId,
  actualizarPeleador,
  eliminarPeleador,
  actualizarDisponibilidad,
  obtenerDisponibilidad
} from '../controllers/peleador.controller.js';
import { protegerRuta, autorizarRoles } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', obtenerPeleadores); // Con filtros
router.get('/:id', obtenerPeleadorPorId);

// Rutas protegidas
router.post('/', protegerRuta, autorizarRoles('atleta', 'manager', 'admin'), crearPeleador);
router.put('/:id', protegerRuta, actualizarPeleador);
router.delete('/:id', protegerRuta, eliminarPeleador);

// Disponibilidad
router.get('/:id/disponibilidad', obtenerDisponibilidad);
router.put('/:id/disponibilidad', protegerRuta, actualizarDisponibilidad);

export default router;

