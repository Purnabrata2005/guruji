import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Redirect href="/(root)/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
