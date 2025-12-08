import { Router } from 'express';

const router = Router();

// TODO: Implementar controladores de rankings
// GET /api/rankings/nacional/:pais
// GET /api/rankings/regional/:region
// GET /api/rankings/continental/:continente
// GET /api/rankings/global

router.get('/nacional/:pais', (req, res) => {
  res.json({ message: `Ranking nacional de ${req.params.pais} - Pendiente` });
});

router.get('/global', (req, res) => {
  res.json({ message: 'Ranking global - Pendiente de implementar' });
});

export default router;









