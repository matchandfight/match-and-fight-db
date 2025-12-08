import { createClient } from '@supabase/supabase-js';
import { config } from '@/config/app.config';

// Función para verificar si las credenciales de Supabase son válidas
const isSupabaseConfigured = (): boolean => {
  return (
    config.supabaseUrl !== 'https://dummy.supabase.co' &&
    config.supabaseAnonKey !== 'dummy_key_for_local_development' &&
    config.supabaseAnonKey !== 'TU_ANON_KEY_AQUI' &&
    config.supabaseUrl.includes('supabase.co') &&
    config.supabaseAnonKey.length > 100
  );
};

// Crear cliente de Supabase solo si está configurado
let supabase: ReturnType<typeof createClient>;

try {
  if (isSupabaseConfigured()) {
    supabase = createClient(
      config.supabaseUrl,
      config.supabaseAnonKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      }
    );
    console.log('✅ Cliente de Supabase inicializado correctamente');
  } else {
    console.warn('⚠️ Supabase no está configurado correctamente. Usando modo mock.');
    // Crear un cliente dummy que siempre falla
    supabase = createClient('https://dummy.supabase.co', 'dummy_key');
  }
} catch (error) {
  console.error('❌ Error al inicializar Supabase:', error);
  // Crear un cliente dummy en caso de error
  supabase = createClient('https://dummy.supabase.co', 'dummy_key');
}

export { supabase, isSupabaseConfigured };

// Tipos para la base de datos
export type Database = {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string;
          email: string;
          nombre: string;
          rol: 'ATLETA' | 'MANAGER' | 'PROMOTOR' | 'SUPER_ADMIN';
          peleador_id: string | null;
          peleadores_asociados: string[] | null;
          promotora_nombre: string | null;
          foto_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['usuarios']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['usuarios']['Insert']>;
      };
      peleadores: {
        Row: {
          id: string;
          nombre: string;
          alias: string | null;
          clase: 'N' | 'C' | 'B' | 'A';
          edad: number;
          genero: 'MASCULINO' | 'FEMENINO';
          peso: number;
          altura: number;
          pais: string;
          ciudad: string;
          club: string;
          foto_url: string;
          redes_sociales: string[];
          modalidad: 'MUAY_THAI' | 'K1';
          combates: number;
          ganados: number;
          perdidos: number;
          empates: number;
          kos: number;
          puntuacion_elo: number;
          ultimo_combate: string | null;
          disponible: boolean;
          verificado: boolean;
          manager_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['peleadores']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['peleadores']['Insert']>;
      };
      eventos: {
        Row: {
          id: string;
          nombre: string;
          descripcion: string | null;
          fecha: string;
          hora_inicio: string | null;
          ciudad: string;
          pais: string;
          direccion: string | null;
          promotor_id: string;
          promotor_nombre: string;
          estado: 'BORRADOR' | 'PENDIENTE_APROBACION' | 'RECHAZADO' | 'PUBLICADO' | 'INSCRIPCIONES_ABIERTAS' | 'INSCRIPCIONES_CERRADAS' | 'EN_CURSO' | 'FINALIZADO' | 'CANCELADO';
          categorias: any; // JSONB
          imagen_url: string | null;
          inscripciones_abiertas: boolean;
          fecha_limite_inscripcion: string | null;
          peleadores: number;
          motivo_rechazo: string | null;
          fecha_aprobacion: string | null;
          aprobado_por: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['eventos']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['eventos']['Insert']>;
      };
      inscripciones: {
        Row: {
          id: string;
          evento_id: string;
          peleador_id: string;
          manager_id: string;
          peso: string;
          modalidad: 'MUAY_THAI' | 'K1';
          estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA' | 'EMPAREJADO';
          fecha_inscripcion: string;
          notas: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['inscripciones']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['inscripciones']['Insert']>;
      };
      combates: {
        Row: {
          id: string;
          evento_id: string;
          peleador1_id: string;
          peleador2_id: string;
          peleador1_nombre: string;
          peleador2_nombre: string;
          categoria_id: string;
          peso: string;
          modalidad: 'MUAY_THAI' | 'K1';
          estado: 'PROGRAMADO' | 'EN_CURSO' | 'FINALIZADO' | 'CANCELADO';
          resultado: any | null; // JSONB
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['combates']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['combates']['Insert']>;
      };
      ofertas: {
        Row: {
          id: string;
          promotor: string;
          peleador: string;
          peleador_nombre: string;
          fecha: string;
          peso: string;
          bolsa: number | null;
          estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA';
          ciudad: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['ofertas']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['ofertas']['Insert']>;
      };
    };
  };
};

// Helper para verificar conexión
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('usuarios').select('count', { count: 'exact', head: true });
    return !error;
  } catch (e) {
    console.error('Error conectando a Supabase:', e);
    return false;
  }
};

export default supabase;

