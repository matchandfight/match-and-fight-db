import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.matchandfight.app',
  appName: 'Match and Fight',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    // Permitir conexiones locales y errores de certificados en desarrollo
    allowNavigation: ['*'],
    // Habilitar debugging
    hostname: 'localhost'
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      releaseType: 'APK'
    }
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#667eea',
      showSpinner: false
    },
    Camera: {
      ios: {
        saveToGallery: true
      },
      android: {
        saveToGallery: true
      }
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#667eea'
    }
  }
};

export default config;

