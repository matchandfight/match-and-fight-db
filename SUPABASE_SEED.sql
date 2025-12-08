-- ============================================
-- MATCH AND FIGHT - DATOS DE PRUEBA
-- Este script inserta datos de ejemplo para testing
-- ============================================

-- IMPORTANTE: Ejecutar SUPABASE_SETUP.sql antes de este archivo

-- ============================================
-- DATOS DE PRUEBA: Usuarios
-- ============================================

INSERT INTO usuarios (email, nombre, rol, peleador_id, foto_url) VALUES
-- ATLETAS (peleador_id se actualizará después de insertar peleadores)
('carlos.atleta@test.com', 'Carlos Martínez', 'ATLETA', NULL, 'https://ui-avatars.com/api/?name=Carlos+Martinez&size=200&background=3880ff&color=fff'),
('laura.atleta@test.com', 'Laura Sánchez', 'ATLETA', NULL, 'https://ui-avatars.com/api/?name=Laura+Sanchez&size=200&background=eb445a&color=fff'),
('miguel.atleta@test.com', 'Ahmed Hassan', 'ATLETA', NULL, 'https://ui-avatars.com/api/?name=Ahmed+Hassan&size=200&background=2dd36f&color=fff');

-- MANAGERS
INSERT INTO usuarios (email, nombre, rol, foto_url) VALUES
('ana.manager@test.com', 'Ana Rodríguez', 'MANAGER', 'https://ui-avatars.com/api/?name=Ana+Rodriguez&size=200&background=a855f7&color=fff'),
('pedro.manager@test.com', 'Pedro Sánchez', 'MANAGER', 'https://ui-avatars.com/api/?name=Pedro+Sanchez&size=200&background=6366f1&color=fff'),
('sofia.manager@test.com', 'Sofía Martín', 'MANAGER', 'https://ui-avatars.com/api/?name=Sofia+Martin&size=200&background=ec4899&color=fff');

-- PROMOTORES
INSERT INTO usuarios (email, nombre, rol, promotora_nombre, foto_url) VALUES
('juan.promotor@test.com', 'Juan García', 'PROMOTOR', 'Fight Night Madrid', 'https://ui-avatars.com/api/?name=Juan+Garcia&size=200&background=f59e0b&color=fff'),
('maria.promotor@test.com', 'María López', 'PROMOTOR', 'European Championship', 'https://ui-avatars.com/api/?name=Maria+Lopez&size=200&background=22c55e&color=fff'),
('david.promotor@test.com', 'David Fernández', 'PROMOTOR', 'Spanish Fight League', 'https://ui-avatars.com/api/?name=David+Fernandez&size=200&background=ef4444&color=fff');

-- SUPER ADMINS
INSERT INTO usuarios (email, nombre, rol, foto_url) VALUES
('admin@test.com', 'Administrador', 'SUPER_ADMIN', 'https://ui-avatars.com/api/?name=Super+Admin&size=200&background=dc2626&color=fff'),
('superadmin@test.com', 'Carlos Admin', 'SUPER_ADMIN', 'https://ui-avatars.com/api/?name=Carlos+Admin&size=200&background=7c3aed&color=fff');

-- ============================================
-- DATOS DE PRUEBA: Peleadores
-- ============================================

INSERT INTO peleadores (
    nombre, alias, clase, edad, genero, peso, altura, pais, ciudad, club,
    foto_url, redes_sociales, modalidad, combates, ganados, perdidos, empates, kos,
    puntuacion_elo, ultimo_combate, disponible, verificado, manager_id
) VALUES
('Carlos Martínez', 'El Toro', 'A', 28, 'MASCULINO', 70, 178, 'España', 'Madrid', 'Lumpinee Madrid',
 'https://ui-avatars.com/api/?name=Carlos+Martinez&size=200&background=3880ff&color=fff', 
 ARRAY['@eltoro_muaythai', 'facebook.com/eltoro'], 'MUAY_THAI', 
 29, 23, 5, 1, 15, 1850, '2024-11-15', true, true, 
 (SELECT id FROM usuarios WHERE email = 'ana.manager@test.com')),

('Ahmed Hassan', 'The Hammer', 'A', 26, 'MASCULINO', 75, 182, 'Francia', 'París', 'Fighting Spirit Paris',
 'https://ui-avatars.com/api/?name=Ahmed+Hassan&size=200&background=2dd36f&color=fff',
 ARRAY['@hammer_fighter'], 'K1',
 30, 26, 4, 0, 18, 1920, '2024-11-20', true, true,
 (SELECT id FROM usuarios WHERE email = 'pedro.manager@test.com')),

('Laura Sánchez', 'La Reina', 'B', 24, 'FEMENINO', 58, 168, 'España', 'Barcelona', 'BCN Fighters',
 'https://ui-avatars.com/api/?name=Laura+Sanchez&size=200&background=eb445a&color=fff',
 ARRAY['@lareina_fighter', 'instagram.com/lareina'], 'MUAY_THAI',
 15, 12, 3, 0, 5, 1680, '2024-10-28', true, true,
 (SELECT id FROM usuarios WHERE email = 'sofia.manager@test.com')),

('Marco Rossi', 'Il Leone', 'A', 29, 'MASCULINO', 80, 185, 'Italia', 'Milán', 'Milano Fight Club',
 'https://ui-avatars.com/api/?name=Marco+Rossi&size=200&background=ffc409&color=000',
 ARRAY['@illeone_fighter'], 'K1',
 28, 22, 6, 0, 14, 1780, '2024-11-10', false, true,
 (SELECT id FROM usuarios WHERE email = 'pedro.manager@test.com')),

('David García', 'El Rayo', 'C', 22, 'MASCULINO', 68, 175, 'España', 'Valencia', 'Valencia Combat',
 'https://ui-avatars.com/api/?name=David+Garcia&size=200&background=3dc2ff&color=fff',
 ARRAY['@elrayo_fighter'], 'MUAY_THAI',
 10, 7, 3, 0, 4, 1450, '2024-09-15', true, false,
 (SELECT id FROM usuarios WHERE email = 'ana.manager@test.com')),

('Sophie Dubois', 'La Panthère', 'B', 25, 'FEMENINO', 62, 170, 'Francia', 'Lyon', 'Lyon Warriors',
 'https://ui-avatars.com/api/?name=Sophie+Dubois&size=200&background=9d9fa6&color=fff',
 ARRAY['@lapanthere'], 'MUAY_THAI',
 18, 14, 4, 0, 6, 1620, '2024-11-05', true, true,
 (SELECT id FROM usuarios WHERE email = 'sofia.manager@test.com')),

('Luis Fernández', 'El Matador', 'N', 20, 'MASCULINO', 65, 172, 'España', 'Sevilla', 'Sevilla Fight Academy',
 'https://ui-avatars.com/api/?name=Luis+Fernandez&size=200&background=92949c&color=fff',
 ARRAY[]::text[], 'K1',
 5, 3, 2, 0, 1, 1200, '2024-10-01', true, false,
 (SELECT id FROM usuarios WHERE email = 'ana.manager@test.com')),

('Pietro Lombardi', 'Thunder', 'A', 27, 'MASCULINO', 77, 180, 'Italia', 'Roma', 'Roma Fighting',
 'https://ui-avatars.com/api/?name=Pietro+Lombardi&size=200&background=222428&color=fff',
 ARRAY['@thunder_fighter'], 'K1',
 22, 18, 4, 0, 11, 1800, '2024-11-18', true, true,
 (SELECT id FROM usuarios WHERE email = 'sofia.manager@test.com'));

-- Actualizar peleador_id en usuarios ATLETA
UPDATE usuarios SET peleador_id = (SELECT id FROM peleadores WHERE nombre = 'Carlos Martínez' LIMIT 1)
WHERE email = 'carlos.atleta@test.com';

UPDATE usuarios SET peleador_id = (SELECT id FROM peleadores WHERE nombre = 'Laura Sánchez' LIMIT 1)
WHERE email = 'laura.atleta@test.com';

UPDATE usuarios SET peleador_id = (SELECT id FROM peleadores WHERE nombre = 'Ahmed Hassan' LIMIT 1)
WHERE email = 'miguel.atleta@test.com';

-- Actualizar peleadores_asociados en managers
UPDATE usuarios SET peleadores_asociados = ARRAY[
    (SELECT id FROM peleadores WHERE nombre = 'Carlos Martínez'),
    (SELECT id FROM peleadores WHERE nombre = 'David García'),
    (SELECT id FROM peleadores WHERE nombre = 'Luis Fernández')
] WHERE email = 'ana.manager@test.com';

UPDATE usuarios SET peleadores_asociados = ARRAY[
    (SELECT id FROM peleadores WHERE nombre = 'Ahmed Hassan'),
    (SELECT id FROM peleadores WHERE nombre = 'Marco Rossi')
] WHERE email = 'pedro.manager@test.com';

UPDATE usuarios SET peleadores_asociados = ARRAY[
    (SELECT id FROM peleadores WHERE nombre = 'Laura Sánchez'),
    (SELECT id FROM peleadores WHERE nombre = 'Sophie Dubois'),
    (SELECT id FROM peleadores WHERE nombre = 'Pietro Lombardi')
] WHERE email = 'sofia.manager@test.com';

-- ============================================
-- DATOS DE PRUEBA: Eventos
-- ============================================

INSERT INTO eventos (
    nombre, descripcion, fecha, hora_inicio, ciudad, pais, direccion,
    promotor_id, promotor_nombre, estado, categorias, imagen_url,
    inscripciones_abiertas, fecha_limite_inscripcion, peleadores,
    fecha_aprobacion, aprobado_por
) VALUES
('European K1 Championship', 
 'El campeonato europeo de K1 más prestigioso del año. Participan los mejores peleadores de toda Europa.',
 '2024-12-15', '18:00', 'Madrid', 'España', 'Palacio de Deportes de Madrid',
 (SELECT id FROM usuarios WHERE email = 'juan.promotor@test.com'),
 'Fight Night Madrid',
 'INSCRIPCIONES_ABIERTAS',
 '[
   {"id": "c1", "nombre": "Peso Pluma", "pesoMin": 55, "pesoMax": 60, "modalidad": "K1", "genero": "MASCULINO", "cupos": 8, "inscritos": 5},
   {"id": "c2", "nombre": "Peso Ligero", "pesoMin": 60, "pesoMax": 67, "modalidad": "K1", "genero": "MASCULINO", "cupos": 8, "inscritos": 6},
   {"id": "c3", "nombre": "Peso Welter", "pesoMin": 67, "pesoMax": 75, "modalidad": "K1", "genero": "MASCULINO", "cupos": 8, "inscritos": 4},
   {"id": "c4", "nombre": "Peso Medio", "pesoMin": 75, "pesoMax": 83, "modalidad": "K1", "genero": "MASCULINO", "cupos": 8, "inscritos": 3}
 ]'::jsonb,
 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
 true, '2024-12-10', 18,
 '2024-11-15', (SELECT id FROM usuarios WHERE email = 'admin@test.com')),

('Paris Fight Night',
 'Una noche de combates espectaculares en la ciudad de la luz.',
 '2024-12-20', '20:00', 'París', 'Francia', 'AccorHotels Arena',
 (SELECT id FROM usuarios WHERE email = 'maria.promotor@test.com'),
 'European Championship',
 'INSCRIPCIONES_ABIERTAS',
 '[
   {"id": "c5", "nombre": "Peso Ligero", "pesoMin": 60, "pesoMax": 67, "modalidad": "MUAY_THAI", "genero": "MASCULINO", "cupos": 8, "inscritos": 7},
   {"id": "c6", "nombre": "Peso Femenino", "pesoMin": 55, "pesoMax": 63, "modalidad": "MUAY_THAI", "genero": "FEMENINO", "cupos": 4, "inscritos": 3}
 ]'::jsonb,
 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800',
 true, '2024-12-15', 10,
 '2024-11-18', (SELECT id FROM usuarios WHERE email = 'admin@test.com')),

('Barcelona Warriors',
 'Los guerreros más feroces se enfrentan en Barcelona.',
 '2024-12-28', '19:00', 'Barcelona', 'España', 'Palau Sant Jordi',
 (SELECT id FROM usuarios WHERE email = 'maria.promotor@test.com'),
 'European Championship',
 'PUBLICADO',
 '[
   {"id": "c7", "nombre": "Peso Pluma", "pesoMin": 55, "pesoMax": 60, "modalidad": "MUAY_THAI", "genero": "MASCULINO", "cupos": 8, "inscritos": 0},
   {"id": "c8", "nombre": "Peso Ligero", "pesoMin": 60, "pesoMax": 67, "modalidad": "MUAY_THAI", "genero": "MASCULINO", "cupos": 8, "inscritos": 0},
   {"id": "c9", "nombre": "Peso Medio", "pesoMin": 67, "pesoMax": 75, "modalidad": "K1", "genero": "MASCULINO", "cupos": 8, "inscritos": 0}
 ]'::jsonb,
 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800',
 false, '2024-12-20', 0,
 '2024-11-20', (SELECT id FROM usuarios WHERE email = 'superadmin@test.com'));

-- ============================================
-- DATOS DE PRUEBA: Inscripciones
-- ============================================

INSERT INTO inscripciones (evento_id, peleador_id, manager_id, peso, modalidad, estado, fecha_inscripcion) VALUES
((SELECT id FROM eventos WHERE nombre = 'European K1 Championship'),
 (SELECT id FROM peleadores WHERE nombre = 'Carlos Martínez'),
 (SELECT id FROM usuarios WHERE email = 'ana.manager@test.com'),
 '70kg', 'K1', 'ACEPTADA', '2024-11-20'),

((SELECT id FROM eventos WHERE nombre = 'European K1 Championship'),
 (SELECT id FROM peleadores WHERE nombre = 'Ahmed Hassan'),
 (SELECT id FROM usuarios WHERE email = 'pedro.manager@test.com'),
 '75kg', 'K1', 'ACEPTADA', '2024-11-21'),

((SELECT id FROM eventos WHERE nombre = 'Paris Fight Night'),
 (SELECT id FROM peleadores WHERE nombre = 'Laura Sánchez'),
 (SELECT id FROM usuarios WHERE email = 'sofia.manager@test.com'),
 '58kg', 'MUAY_THAI', 'PENDIENTE', '2024-11-25');

-- ============================================
-- DATOS DE PRUEBA: Ofertas
-- ============================================

INSERT INTO ofertas (promotor, peleador, peleador_nombre, fecha, peso, bolsa, estado, ciudad) VALUES
('Fight Night Madrid',
 (SELECT id FROM peleadores WHERE nombre = 'Carlos Martínez'),
 'Carlos Martínez', '2024-12-15', '70kg', 1500, 'PENDIENTE', 'Madrid'),

('European Championship',
 (SELECT id FROM peleadores WHERE nombre = 'Carlos Martínez'),
 'Carlos Martínez', '2024-12-28', '70kg', 2500, 'PENDIENTE', 'Barcelona'),

('Valencia Combat Night',
 (SELECT id FROM peleadores WHERE nombre = 'Carlos Martínez'),
 'Carlos Martínez', '2024-11-30', '70kg', NULL, 'RECHAZADA', 'Valencia');

-- ============================================
-- FIN DEL SCRIPT DE SEED
-- ============================================

-- Verificar inserción
SELECT 'Usuarios insertados: ' || COUNT(*) FROM usuarios;
SELECT 'Peleadores insertados: ' || COUNT(*) FROM peleadores;
SELECT 'Eventos insertados: ' || COUNT(*) FROM eventos;
SELECT 'Inscripciones insertadas: ' || COUNT(*) FROM inscripciones;
SELECT 'Ofertas insertadas: ' || COUNT(*) FROM ofertas;


