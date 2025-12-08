import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/services/supabase';
import { mockUsuarios, Usuario } from '@/data/mockData';

interface AuthState {
  user: Usuario | null;
  isAuthenticated: boolean;
  useSupabase: boolean; // Toggle entre Supabase y datos mock
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, nombre: string, rol: Usuario['rol']) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<Usuario>) => void;
  setUseSupabase: (use: boolean) => void;
  loginWithMock?: (email: string, password: string) => Promise<boolean>; // Opcional
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      useSupabase: true, // Por defecto usar Supabase, cambiar a false para datos mock

      setUseSupabase: (use: boolean) => {
        set({ useSupabase: use });
      },

      login: async (email: string, password: string) => {
        const { useSupabase } = get();

        if (useSupabase) {
          // ============================================
          // MODO SUPABASE: Autenticación real
          // ============================================
          try {
            // Opción 1: Usar Supabase Auth (requiere configuración adicional)
            // const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            //   email,
            //   password,
            // });
            
            // Opción 2: Buscar usuario directamente en la tabla (para testing rápido)
            const { data: usuarios, error } = await supabase
              .from('usuarios')
              .select('*')
              .eq('email', email)
              .limit(1);

            if (error) {
              console.error('Error al buscar usuario:', error);
              return false;
            }

            if (!usuarios || usuarios.length === 0) {
              console.log('Usuario no encontrado');
              return false;
            }

            // Por ahora, aceptamos cualquier password para testing
            // En producción, deberías validar con Supabase Auth
            if (password !== 'test123') {
              console.log('Password incorrecto');
              return false;
            }

            const dbUser = usuarios[0] as any;
            
            // Convertir de formato DB a formato App
            const user: Usuario = {
              id: dbUser.id,
              email: dbUser.email,
              nombre: dbUser.nombre,
              rol: dbUser.rol as Usuario['rol'],
              peleadorId: dbUser.peleador_id || undefined,
              peleadoresAsociados: dbUser.peleadores_asociados || undefined,
              promotoraNombre: dbUser.promotora_nombre || undefined,
              fotoUrl: dbUser.foto_url || undefined,
            };

            set({ user, isAuthenticated: true });
            console.log('Login exitoso (Supabase):', user);
            return true;
          } catch (error) {
            console.error('Error en login con Supabase:', error);
            // Fallback a datos mock si Supabase falla
            console.log('Intentando con datos mock...');
            const loginMock = get().loginWithMock;
            return loginMock ? loginMock(email, password) : false;
          }
        } else {
          // ============================================
          // MODO MOCK: Datos de prueba locales
          // ============================================
          const loginMock = get().loginWithMock;
          return loginMock ? loginMock(email, password) : false;
        }
      },

      // Función helper para login con datos mock
      loginWithMock: async (email: string, password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const user = mockUsuarios.find((u) => u.email === email);

        if (user && password === 'test123') {
          set({ user, isAuthenticated: true });
          console.log('Login exitoso (Mock):', user);
          return true;
        }

        return false;
      },

      register: async (email: string, _password: string, nombre: string, rol: Usuario['rol']) => {
        const { useSupabase } = get();

        if (useSupabase) {
          // ============================================
          // MODO SUPABASE: Registro real
          // ============================================
          try {
            // Opción 1: Usar Supabase Auth (requiere configuración)
            // const { data: authData, error: authError } = await supabase.auth.signUp({
            //   email,
            //   password,
            // });

            // Opción 2: Insertar directamente en la tabla (para testing rápido)
            const { data, error } = await (supabase as any)
              .from('usuarios')
              .insert([
                {
                  email,
                  nombre,
                  rol,
                  peleador_id: null,
                  peleadores_asociados: null,
                  promotora_nombre: null,
                  foto_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&size=200&background=random`,
                },
              ])
              .select()
              .single();

            if (error || !data) {
              console.error('Error al registrar usuario:', error);
              return false;
            }

            const dbData = data as any;
            const newUser: Usuario = {
              id: dbData.id,
              email: dbData.email,
              nombre: dbData.nombre,
              rol: dbData.rol as Usuario['rol'],
              fotoUrl: dbData.foto_url || undefined,
            };

            set({ user: newUser, isAuthenticated: true });
            console.log('Registro exitoso (Supabase):', newUser);
            return true;
          } catch (error) {
            console.error('Error en registro con Supabase:', error);
            return false;
          }
        } else {
          // ============================================
          // MODO MOCK: Registro con datos locales
          // ============================================
          await new Promise((resolve) => setTimeout(resolve, 500));

          const newUser: Usuario = {
            id: String(mockUsuarios.length + 1),
            email,
            nombre,
            rol,
          };

          mockUsuarios.push(newUser);
          set({ user: newUser, isAuthenticated: true });
          console.log('Registro exitoso (Mock):', newUser);
          return true;
        }
      },

      logout: () => {
        const { useSupabase } = get();
        
        if (useSupabase) {
          // Cerrar sesión en Supabase
          supabase.auth.signOut().catch(console.error);
        }
        
        set({ user: null, isAuthenticated: false });
        console.log('Logout exitoso');
      },

      updateUser: (userData: Partial<Usuario>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Export del store antiguo para compatibilidad
export default useAuthStore;

