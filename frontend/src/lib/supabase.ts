import { createClient } from '@supabase/supabase-js';
import { config } from '@/config/app.config';

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

