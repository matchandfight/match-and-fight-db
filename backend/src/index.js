import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Importar rutas
import authRoutes from './routes/auth.routes.js';
import peleadorRoutes from './routes/peleador.routes.js';
import managerRoutes from './routes/manager.routes.js';
import promotorRoutes from './routes/promotor.routes.js';
import eventoRoutes from './routes/evento.routes.js';
import ofertaRoutes from './routes/oferta.routes.js';
import resultadoRoutes from './routes/resultado.routes.js';
import rankingRoutes from './routes/ranking.routes.js';

// Configuración
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
connectDB();

// Rutas base
app.get('/', (req, res) => {
  res.json({
    message: '🥊 Ranking App API - Sistema de Matchmaking para Deportes de Contacto',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      peleadores: '/api/peleadores',
      managers: '/api/managers',
      promotores: '/api/promotores',
      eventos: '/api/eventos',
      ofertas: '/api/ofertas',
      resultados: '/api/resultados',
      rankings: '/api/rankings'
    }
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/peleadores', peleadorRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/promotores', promotorRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/ofertas', ofertaRoutes);
app.use('/api/resultados', resultadoRoutes);
app.use('/api/rankings', rankingRoutes);

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 Entorno: ${process.env.NODE_ENV}`);
});

export default app;

