import express from 'express';
import {
  crearEvento,
  obtenerEventos,
  obtenerEventoPorId,
  actualizarEvento,
  eliminarEvento,
  agregarCombate,
  obtenerEventosProximos
} from '../controllers/evento.controller.js';
import { protegerRuta, autorizarRoles } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', obtenerEventos);
router.get('/proximos', obtenerEventosProximos);
router.get('/:id', obtenerEventoPorId);

// Rutas protegidas
router.post('/', protegerRuta, autorizarRoles('promotor', 'admin'), crearEvento);
router.put('/:id', protegerRuta, autorizarRoles('promotor', 'admin'), actualizarEvento);
router.delete('/:id', protegerRuta, autorizarRoles('promotor', 'admin'), eliminarEvento);

// Gestión de combates en el evento
router.post('/:id/combates', protegerRuta, autorizarRoles('promotor', 'admin'), agregarCombate);

export default router;

