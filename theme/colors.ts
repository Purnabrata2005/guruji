const lightColors = {
  background: "#ffffff",
  foreground: "#121212",

  card: "#f4f4f4",
  cardForeground: "#121212",

  popover: "#ffffff",
  popoverForeground: "#121212",

  primary: "#ff6600",
  primaryForeground: "#ffffff",

  secondary: "#f0f0f0",
  secondaryForeground: "#121212",

  muted: "#e0e0e0",
  mutedForeground: "#666666",

  accent: "#ffb380",
  accentForeground: "#121212",

  destructive: "#ef4444",
  destructiveForeground: "#ffffff",

  border: "#e0e0e0",
  input: "#e0e0e0",
  ring: "#ff6600",

  text: "#121212",
  textMuted: "#666666",

  tint: "#ff6600",
  icon: "#666666",
  tabIconDefault: "#666666",
  tabIconSelected: "#ff6600",

  blue: "#007AFF",
  green: "#34C759",
  red: "#FF3B30",
  orange: "#FF9500",
  yellow: "#FFCC00",
  pink: "#FF2D92",
  purple: "#AF52DE",
  teal: "#5AC8FA",
  indigo: "#5856D6",
};

const darkColors = {
  background: "#121212",
  foreground: "#ffffff",

  card: "#1c1c1c",
  cardForeground: "#ffffff",

  popover: "#1c1c1c",
  popoverForeground: "#ffffff",

  primary: "#ff6600",
  primaryForeground: "#ffffff",

  secondary: "#2a2a2a",
  secondaryForeground: "#ffffff",

  muted: "#333333",
  mutedForeground: "#bbbbbb",

  accent: "#ffb380",
  accentForeground: "#121212",

  destructive: "#ef4444",
  destructiveForeground: "#ffffff",

  border: "#333333",
  input: "#333333",
  ring: "#ff6600",

  text: "#ffffff",
  textMuted: "#bbbbbb",

  tint: "#ff6600",
  icon: "#bbbbbb",
  tabIconDefault: "#bbbbbb",
  tabIconSelected: "#ff6600",

  blue: "#007AFF",
  green: "#34C759",
  red: "#FF3B30",
  orange: "#FF9500",
  yellow: "#FFCC00",
  pink: "#FF2D92",
  purple: "#AF52DE",
  teal: "#5AC8FA",
  indigo: "#5856D6",
};

export const Colors = {
  light: lightColors,
  dark: darkColors,
};

// Export individual color schemes for easier access
export { darkColors, lightColors };

// Utility type for color keys
export type ColorKeys = keyof typeof lightColors;
