# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Download google services files from firebase console

3. Setup google services files with eas (login expo account with eas)
```
eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value ./path/to/google-services.json
eas secret:create --scope project --name GOOGLE_SERVICES_INFOPLIST --type file --value ./path/to/google-services-info.plist
```

