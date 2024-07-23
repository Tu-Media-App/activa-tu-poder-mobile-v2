export default {
  "expo": {
    "name": "activa-tu-poder-mobile-v2",
    "slug": "activa-tu-poder-mobile-v2",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "googleServicesFile": process.env.GOOGLE_SERVICES_INFOPLIST,
      "bundleIdentifier": "com.activatupoder",
      "supportsTablet": true,
    },
    "android": {
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON,
      "package": "com.activatupoder",
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "@react-native-google-signin/google-signin",
      "@react-native-firebase/app",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "98ab56b0-9776-4f74-af69-f4440b0e930f"
      }
    }
  }
}
