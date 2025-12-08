-- ============================================
-- MATCH AND FIGHT - SCHEMA DE BASE DE DATOS
-- Supabase SQL Migration
-- ============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- TABLA: usuarios
-- ============================================
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    rol TEXT NOT NULL CHECK (rol IN ('ATLETA', 'MANAGER', 'PROMOTOR', 'SUPER_ADMIN')),
    peleador_id UUID NULL,
    peleadores_asociados UUID[] NULL,
    promotora_nombre TEXT NULL,
    foto_url TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: peleadores
-- ============================================
CREATE TABLE IF NOT EXISTS public.peleadores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    alias TEXT NULL,
    clase TEXT NOT NULL CHECK (clase IN ('N', 'C', 'B', 'A')),
    edad INTEGER NOT NULL,
    genero TEXT NOT NULL CHECK (genero IN ('MASCULINO', 'FEMENINO')),
    peso NUMERIC(5,2) NOT NULL,
    altura INTEGER NOT NULL,
    pais TEXT NOT NULL,
    ciudad TEXT NOT NULL,
    club TEXT NOT NULL,
    foto_url TEXT NOT NULL,
    redes_sociales TEXT[] DEFAULT '{}',
    modalidad TEXT NOT NULL CHECK (modalidad IN ('MUAY_THAI', 'K1')),
    -- Record
    combates INTEGER DEFAULT 0,
    ganados INTEGER DEFAULT 0,
    perdidos INTEGER DEFAULT 0,
    empates INTEGER DEFAULT 0,
    kos INTEGER DEFAULT 0,
    -- Sistema Elo
    puntuacion_elo INTEGER DEFAULT 1500,
    ultimo_combate DATE NULL,
    disponible BOOLEAN DEFAULT true,
    verificado BOOLEAN DEFAULT false,
    manager_id UUID NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: eventos
-- ============================================
CREATE TABLE IF NOT EXISTS public.eventos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre TEXT NOT NULL,
    descripcion TEXT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NULL,
    ciudad TEXT NOT NULL,
    pais TEXT NOT NULL,
    direccion TEXT NULL,
    promotor_id UUID NOT NULL,
    promotor_nombre TEXT NOT NULL,
    estado TEXT NOT NULL CHECK (estado IN (
        'BORRADOR', 
        'PENDIENTE_APROBACION', 
        'RECHAZADO', 
        'PUBLICADO', 
        'INSCRIPCIONES_ABIERTAS', 
        'INSCRIPCIONES_CERRADAS', 
        'EN_CURSO', 
        'FINALIZADO', 
        'CANCELADO'
    )),
    categorias JSONB DEFAULT '[]'::jsonb,
    imagen_url TEXT NULL,
    inscripciones_abiertas BOOLEAN DEFAULT false,
    fecha_limite_inscripcion DATE NULL,
    peleadores INTEGER DEFAULT 0,
    motivo_rechazo TEXT NULL,
    fecha_aprobacion TIMESTAMP NULL,
    aprobado_por UUID NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: inscripciones
-- ============================================
CREATE TABLE IF NOT EXISTS public.inscripciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    evento_id UUID NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
    peleador_id UUID NOT NULL REFERENCES peleadores(id) ON DELETE CASCADE,
    manager_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    peso TEXT NOT NULL,
    modalidad TEXT NOT NULL CHECK (modalidad IN ('MUAY_THAI', 'K1')),
    estado TEXT NOT NULL CHECK (estado IN ('PENDIENTE', 'ACEPTADA', 'RECHAZADA', 'EMPAREJADO')),
    fecha_inscripcion DATE NOT NULL DEFAULT CURRENT_DATE,
    notas TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: combates
-- ============================================
CREATE TABLE IF NOT EXISTS public.combates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    evento_id UUID NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
    peleador1_id UUID NOT NULL REFERENCES peleadores(id),
    peleador2_id UUID NOT NULL REFERENCES peleadores(id),
    peleador1_nombre TEXT NOT NULL,
    peleador2_nombre TEXT NOT NULL,
    categoria_id TEXT NOT NULL,
    peso TEXT NOT NULL,
    modalidad TEXT NOT NULL CHECK (modalidad IN ('MUAY_THAI', 'K1')),
    estado TEXT NOT NULL CHECK (estado IN ('PROGRAMADO', 'EN_CURSO', 'FINALIZADO', 'CANCELADO')),
    resultado JSONB NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLA: ofertas
-- ============================================
CREATE TABLE IF NOT EXISTS public.ofertas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    promotor TEXT NOT NULL,
    peleador UUID NOT NULL REFERENCES peleadores(id) ON DELETE CASCADE,
    peleador_nombre TEXT NOT NULL,
    fecha DATE NOT NULL,
    peso TEXT NOT NULL,
    bolsa NUMERIC(10,2) NULL,
    estado TEXT NOT NULL CHECK (estado IN ('PENDIENTE', 'ACEPTADA', 'RECHAZADA')),
    ciudad TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ÍNDICES
-- ============================================

-- Usuarios
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_rol ON usuarios(rol);

-- Peleadores
CREATE INDEX IF NOT EXISTS idx_peleadores_clase ON peleadores(clase);
CREATE INDEX IF NOT EXISTS idx_peleadores_genero ON peleadores(genero);
CREATE INDEX IF NOT EXISTS idx_peleadores_modalidad ON peleadores(modalidad);
CREATE INDEX IF NOT EXISTS idx_peleadores_disponible ON peleadores(disponible);
CREATE INDEX IF NOT EXISTS idx_peleadores_elo ON peleadores(puntuacion_elo DESC);
CREATE INDEX IF NOT EXISTS idx_peleadores_manager ON peleadores(manager_id);

-- Eventos
CREATE INDEX IF NOT EXISTS idx_eventos_promotor ON eventos(promotor_id);
CREATE INDEX IF NOT EXISTS idx_eventos_estado ON eventos(estado);
CREATE INDEX IF NOT EXISTS idx_eventos_fecha ON eventos(fecha);
CREATE INDEX IF NOT EXISTS idx_eventos_inscripciones ON eventos(inscripciones_abiertas);

-- Inscripciones
CREATE INDEX IF NOT EXISTS idx_inscripciones_evento ON inscripciones(evento_id);
CREATE INDEX IF NOT EXISTS idx_inscripciones_peleador ON inscripciones(peleador_id);
CREATE INDEX IF NOT EXISTS idx_inscripciones_manager ON inscripciones(manager_id);
CREATE INDEX IF NOT EXISTS idx_inscripciones_estado ON inscripciones(estado);

-- Combates
CREATE INDEX IF NOT EXISTS idx_combates_evento ON combates(evento_id);
CREATE INDEX IF NOT EXISTS idx_combates_peleador1 ON combates(peleador1_id);
CREATE INDEX IF NOT EXISTS idx_combates_peleador2 ON combates(peleador2_id);

-- Ofertas
CREATE INDEX IF NOT EXISTS idx_ofertas_peleador ON ofertas(peleador);
CREATE INDEX IF NOT EXISTS idx_ofertas_estado ON ofertas(estado);

-- ============================================
-- TRIGGERS PARA UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_peleadores_updated_at BEFORE UPDATE ON peleadores
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_eventos_updated_at BEFORE UPDATE ON eventos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inscripciones_updated_at BEFORE UPDATE ON inscripciones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_combates_updated_at BEFORE UPDATE ON combates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ofertas_updated_at BEFORE UPDATE ON ofertas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE peleadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE inscripciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE combates ENABLE ROW LEVEL SECURITY;
ALTER TABLE ofertas ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso (permisivas para desarrollo, ajustar para producción)
CREATE POLICY "Permitir lectura pública" ON usuarios FOR SELECT USING (true);
CREATE POLICY "Permitir lectura pública" ON peleadores FOR SELECT USING (true);
CREATE POLICY "Permitir lectura pública" ON eventos FOR SELECT USING (true);
CREATE POLICY "Permitir lectura pública" ON inscripciones FOR SELECT USING (true);
CREATE POLICY "Permitir lectura pública" ON combates FOR SELECT USING (true);
CREATE POLICY "Permitir lectura pública" ON ofertas FOR SELECT USING (true);

-- Permitir inserts autenticados
CREATE POLICY "Permitir inserts autenticados" ON usuarios FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserts autenticados" ON peleadores FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserts autenticados" ON eventos FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserts autenticados" ON inscripciones FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserts autenticados" ON combates FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserts autenticados" ON ofertas FOR INSERT WITH CHECK (true);

-- Permitir updates autenticados
CREATE POLICY "Permitir updates autenticados" ON usuarios FOR UPDATE USING (true);
CREATE POLICY "Permitir updates autenticados" ON peleadores FOR UPDATE USING (true);
CREATE POLICY "Permitir updates autenticados" ON eventos FOR UPDATE USING (true);
CREATE POLICY "Permitir updates autenticados" ON inscripciones FOR UPDATE USING (true);
CREATE POLICY "Permitir updates autenticados" ON combates FOR UPDATE USING (true);
CREATE POLICY "Permitir updates autenticados" ON ofertas FOR UPDATE USING (true);

-- ============================================
-- FUNCIONES ÚTILES
-- ============================================

-- Función para calcular nuevo ELO
CREATE OR REPLACE FUNCTION calcular_nuevo_elo(
    elo_actual INTEGER,
    elo_oponente INTEGER,
    resultado NUMERIC, -- 1 para victoria, 0.5 para empate, 0 para derrota
    k_factor INTEGER DEFAULT 32
)
RETURNS INTEGER AS $$
DECLARE
    probabilidad_esperada NUMERIC;
    nuevo_elo INTEGER;
BEGIN
    -- Calcular probabilidad esperada
    probabilidad_esperada := 1.0 / (1.0 + POWER(10, (elo_oponente - elo_actual) / 400.0));
    
    -- Calcular nuevo ELO
    nuevo_elo := elo_actual + ROUND(k_factor * (resultado - probabilidad_esperada));
    
    -- Asegurar que el ELO no baje de 100
    IF nuevo_elo < 100 THEN
        nuevo_elo := 100;
    END IF;
    
    RETURN nuevo_elo;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- COMENTARIOS
-- ============================================

COMMENT ON TABLE usuarios IS 'Tabla de usuarios del sistema con diferentes roles';
COMMENT ON TABLE peleadores IS 'Tabla de peleadores con su información y estadísticas';
COMMENT ON TABLE eventos IS 'Tabla de eventos/combates organizados por promotores';
COMMENT ON TABLE inscripciones IS 'Inscripciones de peleadores a eventos';
COMMENT ON TABLE combates IS 'Combates individuales dentro de eventos';
COMMENT ON TABLE ofertas IS 'Ofertas de combate de promotores a peleadores';

-- ============================================
-- FIN DEL SCRIPT
-- ============================================

-- Para insertar datos de prueba, ejecuta: SUPABASE_SEED.sql


