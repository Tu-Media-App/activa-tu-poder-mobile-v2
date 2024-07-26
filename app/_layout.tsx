import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { LoaderProvider } from '@/components/global/Loader';
import { Slot } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  //TODO: agregar use effect que ejecute lo que hoy es el auth provider

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <LoaderProvider>
          <Slot />
        </LoaderProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
