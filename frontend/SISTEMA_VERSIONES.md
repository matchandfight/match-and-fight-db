# 📦 Sistema de Versiones de APK

## ✅ Configuración Implementada

### 🔢 Versionado Automático

Cada APK compilada ahora tiene:
- **versionCode**: Número entero incremental (1, 2, 3...)
- **versionName**: Versión semántica (1.0, 2.0, 3.0...)
- **Nombre de archivo**: Incluye versión + timestamp

### 📝 Formato del Nombre de APK

```
RankingApp-v[VERSION]-[TIMESTAMP]-debug.apk
```

**Ejemplo:**
```
RankingApp-v2.0-20251124-1045-debug.apk
```

Donde:
- `v2.0` = Versión de la app
- `20251124` = Fecha (Año-Mes-Día)
- `1045` = Hora (Hora-Minuto)
- `debug` = Tipo de build

---

## 📋 Registro de Versiones

### **Versión 2.0** (Actual)
📅 Fecha: 24 de noviembre de 2025

**Cambios:**
- ✅ Dashboard rediseñado con Highlights y Noticias
- ✅ Identidad visual unificada en toda la app
- ✅ Sistema de diseño completo (design-system.css)
- ✅ 9 usuarios de prueba (3 atletas, 3 managers, 3 promotores)
- ✅ Contraseña universal: `test123`
- ✅ Paleta de colores Strava (#fc5200)
- ✅ Interfaces actualizadas (modalidad, empates, verificado, cambio)
- ✅ Rankings con podio visual mejorado
- ✅ Peleadores con fotos prominentes
- ✅ Sistema de versionado automático

**Correcciones:**
- 🐛 Agregada propiedad `modalidad` a Peleador
- 🐛 Agregada propiedad `empates` al record
- 🐛 Agregada propiedad `verificado` a Peleador
- 🐛 Agregada propiedad `cambio` a Ranking
- 🐛 Eliminados imports no usados
- 🐛 Corregidos errores de TypeScript

---

### **Versión 1.0** (Inicial)
📅 Fecha: 24 de noviembre de 2025

**Características iniciales:**
- ✅ Navegación con tabs inferiores
- ✅ Dashboard básico con estadísticas
- ✅ Rankings con lista
- ✅ Peleadores con búsqueda
- ✅ Ofertas y eventos
- ✅ Sistema de autenticación mock
- ✅ Diseño mobile-first inspirado en Strava

---

## 🔄 Cómo Actualizar la Versión

### Pasos para Nueva Versión:

1. **Editar `android/app/build.gradle`:**

```gradle
defaultConfig {
    versionCode 3  // Incrementar número
    versionName "3.0"  // Actualizar versión
    ...
}
```

2. **Compilar:**

```bash
cd frontend
.\compile_v2.bat
```

3. **Resultado:**

```
RankingApp-v3.0-20251125-0930-debug.apk
```

---

## 📍 Ubicación de APKs

### APK Actual:
```
frontend/android/app/build/outputs/apk/debug/RankingApp-v2.0-[TIMESTAMP]-debug.apk
```

### Historial:
Cada compilación genera un nuevo archivo con timestamp único.

---

## 🎯 Beneficios del Sistema

### 1. **Identificación Clara**
- ✅ Sabes exactamente qué versión tienes instalada
- ✅ El nombre del archivo indica versión y fecha

### 2. **No Sobreescribe**
- ✅ Cada compilación genera un archivo único
- ✅ Puedes mantener varias versiones

### 3. **Trazabilidad**
- ✅ Timestamp indica cuándo se compiló
- ✅ versionCode ayuda a Google Play

### 4. **Fácil Distribución**
- ✅ Nombre descriptivo al compartir
- ✅ Usuarios saben qué versión instalan

---

## 📱 Instalar APK con Versión

### En Android:

1. **Desinstalar versión anterior** (opcional):
   ```
   Configuración > Apps > Ranking App > Desinstalar
   ```

2. **Instalar nueva versión:**
   ```
   Copiar APK > Abrir > Instalar
   ```

3. **Verificar versión:**
   ```
   Configuración > Apps > Ranking App > Información
   Versión: 2.0 (2)
   ```

---

## 🔢 Nomenclatura de Versiones

### versionCode (Número entero):
- Incrementa en **1** con cada compilación
- **Debe ser siempre mayor** que la anterior
- Usado por Google Play Store

```
v1.0 → versionCode 1
v2.0 → versionCode 2
v2.1 → versionCode 3
v3.0 → versionCode 4
```

### versionName (Semántico):
- **MAJOR.MINOR.PATCH**
- **MAJOR**: Cambios grandes (1.0 → 2.0)
- **MINOR**: Nuevas características (2.0 → 2.1)
- **PATCH**: Correcciones (2.1 → 2.1.1)

**Ejemplos:**
```
1.0.0 → Primera versión
2.0.0 → Dashboard rediseñado, sistema de diseño
2.1.0 → Nueva funcionalidad
2.1.1 → Corrección de bugs
3.0.0 → Cambio arquitectónico mayor
```

---

## 🛠️ Scripts de Compilación

### `compile_v2.bat` (Recomendado):
```bash
.\compile_v2.bat
```

**Hace:**
1. Compila proyecto web
2. Copia a Android
3. Limpia proyecto
4. Compila APK con nombre versionado
5. Muestra nombre y ubicación

### Compilación Manual:
```bash
# 1. Build web
npm run build

# 2. Copy to Android
npm exec cap copy android

# 3. Build APK
cd android
.\gradlew assembleDebug
```

---

## 📊 Historial de Compilaciones

| Versión | versionCode | Fecha | Cambios Principales |
|---------|-------------|-------|---------------------|
| 2.0 | 2 | 2025-11-24 | Dashboard con highlights, sistema de diseño, 9 usuarios |
| 1.0 | 1 | 2025-11-24 | Versión inicial MVP |

---

## ⚙️ Configuración Técnica

### build.gradle:
```gradle
android {
    defaultConfig {
        versionCode 2
        versionName "2.0"
        setProperty("archivesBaseName", "RankingApp-v${versionName}-${new Date().format('yyyyMMdd-HHmm')}")
    }
}
```

### Formato Timestamp:
- `yyyyMMdd` = Año-Mes-Día (20251124)
- `HHmm` = Hora-Minuto (1045)

---

## 🎯 Próxima Versión (3.0)

### Cuando incrementar:

**→ v2.1.0** si agregas:
- Nueva página
- Nueva funcionalidad
- Mejoras menores

**→ v3.0.0** si haces:
- Cambio de arquitectura
- Rediseño completo
- Breaking changes
- Integración con backend real

---

## 📝 Checklist Pre-Compilación

Antes de compilar nueva versión:

- [ ] Incrementar `versionCode` en `build.gradle`
- [ ] Actualizar `versionName` en `build.gradle`
- [ ] Documentar cambios en este archivo
- [ ] Ejecutar `npm run build` exitosamente
- [ ] Verificar que no hay errores de linting
- [ ] Probar en localhost antes de compilar
- [ ] Compilar APK
- [ ] Verificar nombre del archivo generado
- [ ] Instalar y probar en dispositivo

---

**Sistema de versionado configurado y funcionando** ✅

**APK Actual:**
```
RankingApp-v2.0-[TIMESTAMP]-debug.apk
Ubicación: frontend/android/app/build/outputs/apk/debug/
```








