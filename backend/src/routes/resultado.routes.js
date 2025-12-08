import express from 'express';
import {
  crearResultado,
  obtenerResultados,
  obtenerResultadoPorId,
  reportarDesacuerdo,
  validarResultado,
  subirPrueba
} from '../controllers/resultado.controller.js';
import { protegerRuta, autorizarRoles } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas públicas (limitadas)
router.get('/', obtenerResultados);
router.get('/:id', obtenerResultadoPorId);

// Rutas protegidas
router.post('/', protegerRuta, autorizarRoles('atleta', 'manager', 'promotor', 'admin'), crearResultado);
router.post('/:id/desacuerdo', protegerRuta, autorizarRoles('atleta', 'manager'), reportarDesacuerdo);
router.post('/:id/prueba', protegerRuta, subirPrueba);

// Validación administrativa
router.put('/:id/validar', protegerRuta, autorizarRoles('admin'), validarResultado);

export default router;

