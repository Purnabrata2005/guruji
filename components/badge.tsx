import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { useColor } from "@/hooks/useColor";
import { BORDER_RADIUS } from "@/theme/globals";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { FONT_SIZE, CORNERS } from "@/constants/style";

// Define the variants to match your web code
export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "purple"
  | "orange";

export interface BadgeProps {
  children: React.ReactNode;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: BadgeVariant;
  style?: ViewStyle;
  className?: string; // For future Tailwind compatibility if needed
}

export function Badge({
  children,
  variant = "default",
  style,
  icon,
  ...props
}: BadgeProps) {
  // Get theme colors
  const greenColor = useColor("green"); // Maps to Emerald
  const orangeColor = useColor("orange");
  const purpleColor = useColor("purple"); // Maps to Destructive/Purple
  const textColor = useColor("text");
  const borderDefault = useColor("border");

  // --- Color Logic (Mimicking the Tailwind classes) ---
  const getVariantStyles = () => {
    switch (variant) {
      case "default": // Emerald style
        return {
          container: {
            backgroundColor: greenColor + "35", // ~8% opacity
            borderColor: greenColor + "90", // ~25% opacity
            borderWidth: 1.4,
          },
          text: { color: greenColor },
        };
      case "secondary": // Orange Gradient style (simplified to border/text)
        return {
          container: {
            backgroundColor: "transparent",
            borderColor: orangeColor + "40",
            borderWidth: 1,
          },
          text: { color: orangeColor },
        };
      case "destructive": // Purple style
        return {
          container: {
            backgroundColor: purpleColor + "15",
            borderColor: purpleColor + "40",
            borderWidth: 1,
          },
          text: { color: purpleColor },
        };
      case "outline": // Emerald outline
        return {
          container: {
            backgroundColor: "transparent",
            borderColor: greenColor + "40",
            borderWidth: 1,
          },
          text: { color: textColor },
        };
      case "purple": // Solid Purple
        return {
          container: {
            backgroundColor: purpleColor,
            borderColor: purpleColor,
            borderWidth: 1,
          },
          text: { color: "#FFFFFF" },
        };
      case "orange": // Solid Orange
        return {
          container: {
            backgroundColor: orangeColor,
            borderColor: orangeColor,
            borderWidth: 1,
          },
          text: { color: "#FFFFFF" },
        };
      case "ghost": // Ghost
        return {
          container: {
            backgroundColor: "transparent",
            borderColor: "transparent",
            borderWidth: 0,
          },
          text: { color: textColor },
        };
      default:
        return {
          container: {
            backgroundColor: greenColor + "15",
            borderColor: greenColor + "40",
            borderWidth: 1,
          },
          text: { color: greenColor },
        };
    }
  };

  const variantStyle = getVariantStyles();
  const contentColor = variantStyle.text.color;

  return (
    <View
      style={[
        styles.baseContainer,
        variantStyle.container,
        style,
        {
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: BORDER_RADIUS - 2,
        },
      ]}
      {...props}>
      {/* Only wrap in Text if children is a string or number */}
      {icon && (
        <Ionicons
          name={icon}
          size={11}
          color={contentColor}
          style={{ marginRight: 4 }}
        />
      )}

      {/* {React.Children.map(children, child => {
        if (typeof child === "string" || typeof child === "number") {
          return (
            <Text style={[styles.baseText, variantStyle.text]}>{child}</Text>
          );
        }

        // If child is a component (icon etc.)
        return child;
      })} */}
      {typeof children === "string" || typeof children === "number" ? (
        <Text style={[styles.baseText, variantStyle.text]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start", // w-fit
    overflow: "hidden",
    gap: 4, // Add gap for icon+text spacing
  },
  baseText: {
    fontSize: 11,
    fontWeight: "600",
  },
});
