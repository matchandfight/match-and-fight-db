import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Cliente público (para frontend)
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

// Cliente con privilegios de servicio (para backend)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Helper para subir imágenes a Supabase Storage
export const uploadImage = async (
  bucket: string,
  path: string,
  file: Buffer,
  contentType: string
): Promise<string | null> => {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, file, {
        contentType,
        upsert: false,
      });

    if (error) {
      console.error('Error al subir imagen:', error);
      return null;
    }

    // Obtener URL pública
    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error en uploadImage:', error);
    return null;
  }
};

// Helper para eliminar imagen de Supabase Storage
export const deleteImage = async (
  bucket: string,
  path: string
): Promise<boolean> => {
  try {
    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Error al eliminar imagen:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error en deleteImage:', error);
    return false;
  }
};
