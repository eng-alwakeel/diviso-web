import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.diviso.app',
  appName: 'Diviso',
  webDir: 'dist',
  server: {
    cleartext: true,
    allowNavigation: ['diviso.app']
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1A1C1E',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#1A1C1E',
    },
    Camera: {
      ios: {
        NSCameraUsageDescription: 'نحتاج الوصول للكاميرا لمسح الفواتير',
        NSPhotoLibraryUsageDescription: 'نحتاج الوصول لمعرض الصور لتحميل الفواتير',
      },
      android: {
        permissions: ['camera', 'photos']
      }
    },
    Contacts: {
      ios: {
        NSContactsUsageDescription: 'نحتاج الوصول لجهات الاتصال لدعوة أصدقائك'
      }
    },
    Geolocation: {
      ios: {
        NSLocationWhenInUseUsageDescription: 'نحتاج موقعك لتحسين تجربة الاستخدام وعرض العروض القريبة منك',
        NSLocationAlwaysAndWhenInUseUsageDescription: 'نحتاج موقعك لتتبع موقعك في الخلفية'
      }
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
  // Deep linking configuration
  appUrlOpen: {
    // Custom scheme for deep links
    scheme: 'diviso',
    // Host for universal links
    host: 'diviso.app',
  },
};

export default config;
