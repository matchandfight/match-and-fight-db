import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

// Prisma Client (para queries SQL con type-safety)
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Supabase Client (para autenticación, storage, realtime)
export const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

export const connectDB = async (): Promise<void> => {
  try {
    // Probar conexión con Prisma
    await prisma.$connect();
    console.log('✅ Prisma conectado a Supabase (PostgreSQL)');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('🛑 Prisma desconectado debido a cierre de aplicación');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  console.log('🛑 Prisma desconectado debido a SIGTERM');
  process.exit(0);
});

