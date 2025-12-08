import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { ApiError } from './errorHandler';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'atleta' | 'manager' | 'promotor' | 'admin';
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'No se proporcionó token de autenticación');
    }

    const token = authHeader.split(' ')[1];

    // Verificar token con Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new ApiError(401, 'Token inválido o expirado');
    }

    // Obtener información adicional del usuario desde tu tabla personalizada
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('id, email, role')
      .eq('auth_id', user.id)
      .single();

    if (userError || !userData) {
      throw new ApiError(404, 'Usuario no encontrado');
    }

    req.user = userData;
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware para verificar roles específicos
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, 'No autenticado'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'No tienes permisos para realizar esta acción'));
    }

    next();
  };
};

