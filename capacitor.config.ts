import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'angular20',
  webDir: 'www',
  server: {
    androidScheme: 'http',  // 👈 Esto hace que la WebView use HTTP en lugar de HTTPS
    cleartext: true         // 👈 Esto permite tráfico sin cifrar
  },
  android: {
    allowMixedContent: true, // 👈 Solo para desarrollo, NO en producción
    adjustMarginsForEdgeToEdge: 'force'
  }
};

export default config;
