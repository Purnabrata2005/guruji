import { Colors } from "@/theme/colors";
import { ThemeProvider } from "@/theme/theme-provider";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import Head from "expo-router/head";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

function InitialLayout() {
  const isAuthenticated = false;
  const isLoading = false;

  if (isLoading) {
    return null;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="(root)" />
          <Stack.Screen name="+not-found" />
        </>
      ) : (
        <>
          <Stack.Screen name="(auth)" />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="+not-found" />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Light": Inter_300Light,
    "Inter-Regular": Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold,
    "Inter-ExtraBold": Inter_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  const colorScheme = useColorScheme() || "light";

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync(
        colorScheme === "light" ? "dark" : "light",
      );
    }
  }, [colorScheme]);

  useEffect(() => {
    setBackgroundColorAsync(
      colorScheme === "dark" ? Colors.dark.background : Colors.light.background,
    );
  }, [colorScheme]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {Platform.OS === "web" && (
        <Head>
          <meta name="color-scheme" content="light dark" />
        </Head>
      )}
      <ThemeProvider>
        <SafeAreaProvider>
          <StatusBar
            style={colorScheme === "dark" ? "light" : "dark"}
            animated
          />
          <InitialLayout />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
