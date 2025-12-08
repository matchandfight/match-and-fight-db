import express from 'express';
import {
  crearManager,
  obtenerManagers,
  obtenerManagerPorId,
  actualizarManager,
  agregarPeleador,
  removerPeleador,
  obtenerPeleadoresDelManager
} from '../controllers/manager.controller.js';
import { protegerRuta, autorizarRoles } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', obtenerManagers);
router.get('/:id', obtenerManagerPorId);

// Rutas protegidas
router.post('/', protegerRuta, autorizarRoles('manager', 'admin'), crearManager);
router.put('/:id', protegerRuta, autorizarRoles('manager', 'admin'), actualizarManager);

// Gestión de peleadores
router.get('/:id/peleadores', protegerRuta, obtenerPeleadoresDelManager);
router.post('/:id/peleadores/:peleadorId', protegerRuta, agregarPeleador);
router.delete('/:id/peleadores/:peleadorId', protegerRuta, removerPeleador);

export default router;

