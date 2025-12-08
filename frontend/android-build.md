# 📱 Guía de Compilación para Android

## ⚙️ Requisitos Previos

### Java JDK 17
```bash
# Verificar versión de Java
java -version
# Debe mostrar: openjdk version "17.x.x"
```

### Android SDK
```
Ubicación: C:\Users\Slayer\AppData\Local\Android\Sdk
```

### Gradle 8.9
Se configurará automáticamente en el proyecto.

---

## 🚀 Pasos para Compilar APK

### 1. Build del Frontend
```bash
cd frontend
npm run build
```

### 2. Sincronizar con Capacitor
```bash
npx cap sync android
```

### 3. Configurar Gradle (Importante)

Editar `android/gradle/wrapper/gradle-wrapper.properties`:
```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.9-bin.zip
```

### 4. Configurar Java 17 en build.gradle

Los archivos ya deberían estar configurados, pero verifica:

**android/capacitor-cordova-android-plugins/build.gradle:**
```gradle
compileOptions {
    sourceCompatibility JavaVersion.VERSION_17
    targetCompatibility JavaVersion.VERSION_17
}
```

**android/app/capacitor.build.gradle:**
```gradle
compileOptions {
    sourceCompatibility JavaVersion.VERSION_17
    targetCompatibility JavaVersion.VERSION_17
}
```

### 5. Configurar local.properties

Crear/editar `android/local.properties`:
```properties
sdk.dir=C:\\Users\\Slayer\\AppData\\Local\\Android\\Sdk
```

### 6. Compilar APK
```bash
cd android
.\gradlew clean
.\gradlew assembleDebug --rerun-tasks
```

### 7. Ubicación del APK
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔧 Solución de Problemas

### Error: Java version mismatch
```bash
# Asegúrate de usar Java 17
java -version
```

### Error: Gradle version
```bash
# Limpiar cache de Gradle
.\gradlew clean --refresh-dependencies
```

### Error: SDK not found
```bash
# Verificar ruta en local.properties
# Debe ser: C:\\Users\\Slayer\\AppData\\Local\\Android\\Sdk
```

---

## 📦 Instalar APK en Dispositivo

### Via USB:
```bash
adb install app-debug.apk
```

### Via Compartir:
1. Copia el APK a tu teléfono
2. Habilita "Instalar apps desconocidas"
3. Abre el APK y instala

---

## ✅ Checklist Pre-Compilación

- [ ] npm run build ejecutado
- [ ] npx cap sync android ejecutado
- [ ] gradle-wrapper.properties con Gradle 8.9
- [ ] build.gradle con Java 17
- [ ] local.properties con ruta SDK correcta
- [ ] Java 17 activo en terminal

---

## 📝 Notas

- **APK Debug:** Para testing
- **APK Release:** Requiere keystore para Play Store
- **Tamaño esperado:** ~15-25 MB
- **Tiempo de compilación:** 3-5 minutos









