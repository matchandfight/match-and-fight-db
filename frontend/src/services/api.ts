import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si no hay conexión al backend, no redirigir automáticamente
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
      console.warn('No se puede conectar al backend, usando modo offline');
      return Promise.reject(error);
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Servicios de autenticación
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  register: async (userData: any) => {
    const response = await api.post('/auth/registro', userData);
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// Servicios de peleadores
export const peleadorService = {
  getAll: async (filtros?: any) => {
    const response = await api.get('/peleadores', { params: filtros });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/peleadores/${id}`);
    return response.data;
  },

  create: async (peleadorData: any) => {
    const response = await api.post('/peleadores', peleadorData);
    return response.data;
  },

  update: async (id: string, peleadorData: any) => {
    const response = await api.put(`/peleadores/${id}`, peleadorData);
    return response.data;
  },

  updateDisponibilidad: async (id: string, disponibilidad: any) => {
    const response = await api.put(`/peleadores/${id}/disponibilidad`, { disponibilidad });
    return response.data;
  },
};

// Servicios de rankings
export const rankingService = {
  getGlobal: async (filtros?: any) => {
    const response = await api.get('/rankings/global', { params: filtros });
    return response.data;
  },

  getByPais: async (pais: string, filtros?: any) => {
    const response = await api.get(`/rankings/pais/${pais}`, { params: filtros });
    return response.data;
  },

  getByRegion: async (region: string) => {
    const response = await api.get(`/rankings/region/${region}`);
    return response.data;
  },

  getHistorial: async (peleadorId: string) => {
    const response = await api.get(`/rankings/historial/${peleadorId}`);
    return response.data;
  },
};

// Servicios de eventos
export const eventoService = {
  getAll: async (filtros?: any) => {
    const response = await api.get('/eventos', { params: filtros });
    return response.data;
  },

  getProximos: async () => {
    const response = await api.get('/eventos/proximos');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/eventos/${id}`);
    return response.data;
  },

  create: async (eventoData: any) => {
    const response = await api.post('/eventos', eventoData);
    return response.data;
  },
};

// Servicios de ofertas
export const ofertaService = {
  getAll: async (filtros?: any) => {
    const response = await api.get('/ofertas', { params: filtros });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/ofertas/${id}`);
    return response.data;
  },

  create: async (ofertaData: any) => {
    const response = await api.post('/ofertas', ofertaData);
    return response.data;
  },

  responder: async (id: string, respuesta: any) => {
    const response = await api.put(`/ofertas/${id}/responder`, respuesta);
    return response.data;
  },

  agregarMensaje: async (id: string, texto: string) => {
    const response = await api.post(`/ofertas/${id}/mensajes`, { texto });
    return response.data;
  },
};

