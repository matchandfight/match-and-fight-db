import express from 'express';
import {
  crearOferta,
  obtenerOfertas,
  obtenerOfertaPorId,
  responderOferta,
  cancelarOferta,
  agregarMensaje,
  obtenerOfertasPendientes
} from '../controllers/oferta.controller.js';
import { protegerRuta, autorizarRoles } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas protegidas
router.post('/', protegerRuta, autorizarRoles('promotor', 'admin'), crearOferta);
router.get('/', protegerRuta, obtenerOfertas);
router.get('/pendientes', protegerRuta, obtenerOfertasPendientes);
router.get('/:id', protegerRuta, obtenerOfertaPorId);

// Responder y gestionar ofertas
router.put('/:id/responder', protegerRuta, autorizarRoles('atleta', 'manager', 'admin'), responderOferta);
router.put('/:id/cancelar', protegerRuta, cancelarOferta);

// Mensajes
router.post('/:id/mensajes', protegerRuta, agregarMensaje);

export default router;

