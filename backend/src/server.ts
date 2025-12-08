import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/errorHandler';

// Importar rutas
import peleadorRoutes from './routes/peleador.routes';
import managerRoutes from './routes/manager.routes';
import promotorRoutes from './routes/promotor.routes';
import eventoRoutes from './routes/evento.routes';
import ofertaRoutes from './routes/oferta.routes';
import resultadoRoutes from './routes/resultado.routes';
import rankingRoutes from './routes/ranking.routes';
import authRoutes from './routes/auth.routes';

// Configuración
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8100',
  credentials: true
}));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/peleadores', peleadorRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/promotores', promotorRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/ofertas', ofertaRoutes);
app.use('/api/resultados', resultadoRoutes);
app.use('/api/rankings', rankingRoutes);

// Ruta de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Manejador de errores
app.use(errorHandler);

// Conectar a la base de datos e iniciar servidor
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`📊 Modo: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;









