import { Router } from 'express';

const router = Router();

// TODO: Implementar controladores de autenticación
// POST /api/auth/register
// POST /api/auth/login
// POST /api/auth/logout
// GET /api/auth/me
// POST /api/auth/forgot-password
// POST /api/auth/reset-password

router.post('/register', (req, res) => {
  res.json({ message: 'Registro - Pendiente de implementar' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login - Pendiente de implementar' });
});

export default router;









