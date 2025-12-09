import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsuarios, Usuario } from '@/data/mockData';

interface AuthState {
  user: Usuario | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, nombre: string, rol: Usuario['rol']) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<Usuario>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simular llamada a API
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Buscar usuario en mock data
        const user = mockUsuarios.find((u) => u.email === email);

        if (user && password === 'test123') {
          set({ user, isAuthenticated: true });
          return true;
        }

        return false;
      },

      register: async (email: string, _password: string, nombre: string, rol: Usuario['rol']) => {
        // Simular llamada a API
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Crear nuevo usuario
        const newUser: Usuario = {
          id: String(mockUsuarios.length + 1),
          email,
          nombre,
          rol,
        };

        // Agregar a mock data (solo en memoria)
        mockUsuarios.push(newUser);

        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
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





