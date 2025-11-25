import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/theme/colors";
import { ThemeProvider } from "@/theme/theme-provider";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import Head from "expo-router/head";
import * as SplashScreen from "expo-splash-screen";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useCallback, useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  const colorScheme = useColorScheme() || "light";
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  //  SPLASH HIDE  //
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync(
        colorScheme === "light" ? "dark" : "light",
      );
    }
  }, [colorScheme]);

  // Keep the root view background color in sync with the current theme
  useEffect(() => {
    setBackgroundColorAsync(
      colorScheme === "dark" ? Colors.dark.background : Colors.light.background,
    );
  }, [colorScheme]);
  const onLayoutRootView = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);
  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      {Platform.OS === "web" && (
        <Head>
          <meta name="color-scheme" content="light dark" />
        </Head>
      )}
      <ThemeProvider>
        <SafeAreaProvider>
          {/* <StatusBar
            barStyle={colorScheme === "dark" ? "light" : "dark"}
            animated
          /> */}
          <StatusBar barStyle="default" animated />
          <AppNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function AppNavigator() {
  const isAuthenticated = true;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="+not-found" />
      {/* Public screens */}
      <Stack.Screen name="(auth)" />

      {/* Protected screens */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(root)" />
      </Stack.Protected>
    </Stack>
  );
}
