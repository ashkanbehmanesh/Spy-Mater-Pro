
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.spymaster.pro',
  appName: 'SpyMaster Pro',
  webDir: 'dist', // This is the folder where your build assets will go
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  ios: {
    contentInset: 'always'
  }
};

export default config;
