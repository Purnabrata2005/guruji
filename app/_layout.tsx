import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import Head from "expo-router/head";
import * as SplashScreen from "expo-splash-screen";
import { PressablesConfig } from "pressto";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

//  SPLASH OPTIONS  //
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500, // fade animation duration
  fade: true, // Enable fade transition
});

export default function RootLayout() {
  //  FONTS  //
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
    ...Ionicons.font, // Ionicons font
  });

  //  SPLASH HIDE  //
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {Platform.OS === "web" && (
        <Head>
          <meta name="color-scheme" content="light dark" />
        </Head>
      )}
      <PressablesConfig globalHandlers={globalPressableHandlers}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </PressablesConfig>
    </GestureHandlerRootView>
  );
}

function AppNavigator() {
  const isAuthenticated = true;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Public screens */}
      <Stack.Screen name="(auth)" />

      {/* Protected screens */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(root)" />
      </Stack.Protected>
    </Stack>
  );
}

const globalPressableHandlers = {
  onPress: () => {
    Haptics.selectionAsync(); // Light haptic feedback
  },
};
