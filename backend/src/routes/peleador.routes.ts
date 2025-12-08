import { Router } from 'express';

const router = Router();

// TODO: Implementar controladores de peleadores
// GET /api/peleadores - Listar todos con filtros
// GET /api/peleadores/:id - Obtener uno por ID
// POST /api/peleadores - Crear peleador
// PUT /api/peleadores/:id - Actualizar peleador
// DELETE /api/peleadores/:id - Eliminar peleador
// GET /api/peleadores/:id/disponibilidad - Ver calendario
// PUT /api/peleadores/:id/disponibilidad - Actualizar calendario

router.get('/', (req, res) => {
  res.json({ message: 'Lista de peleadores - Pendiente de implementar' });
});

export default router;









