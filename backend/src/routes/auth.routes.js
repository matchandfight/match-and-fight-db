import express from 'express';
import {
  registro,
  login,
  obtenerPerfil,
  actualizarPerfil,
  cambiarPassword
} from '../controllers/auth.controller.js';
import { protegerRuta } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas públicas
router.post('/registro', registro);
router.post('/login', login);

// Rutas protegidas
router.get('/perfil', protegerRuta, obtenerPerfil);
router.put('/perfil', protegerRuta, actualizarPerfil);
router.put('/cambiar-password', protegerRuta, cambiarPassword);

export default router;

