// Configuración de la aplicación
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // 🔥 SUPABASE - Credenciales del Proyecto
  // Project ID: ptmalgtkllfowdrdcage
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://ptmalgtkllfowdrdcage.supabase.co',
  
  // ⚠️ TODO: Reemplaza esto con tu anon public key de Supabase
  // La encuentras en: Settings > API > Project API keys > anon public
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0bWFsZ3RrbGxmb3dkcmRjYWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNzQyMzEsImV4cCI6MjA3OTc1MDIzMX0.2sx3x0e-uHP824C_Ab25Xf3HwJsGOWIdlDtc6UfjRns',
  
  appName: import.meta.env.VITE_APP_NAME || 'Match and Fight',
  appVersion: import.meta.env.VITE_APP_VERSION || '2.0.0',
};








