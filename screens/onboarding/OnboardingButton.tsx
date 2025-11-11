import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { useColor } from "@/hooks/useColor";
import { CORNERS, FONT_SIZE, HEIGHT } from "@/theme/globals";
import { useRouter } from "expo-router";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonProps = {
  flatListRef: any;
  flatListIndex: SharedValue<number>;
  dataLength: number;
};

export function OnboardingButton({
  dataLength,
  flatListIndex,
  flatListRef,
}: ButtonProps) {
  const backgroundColor = useColor("backgroundHighlightColor");
  const textColor = useColor("textHighlightColor");
  const router = useRouter();
  const buttonAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      width: isLastScreen ? withSpring(140) : withSpring(60),
      height: HEIGHT,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(0) : withTiming(1),
      transform: [
        { translateX: isLastScreen ? withTiming(100) : withTiming(0) },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(1) : withTiming(0),
      transform: [
        { translateX: isLastScreen ? withTiming(0) : withTiming(-100) },
      ],
    };
  });

  const handleNextScreen = () => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    if (!isLastScreen) {
      flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
    } else {
      router.push("/(auth)/sign-in");
    }
  };

  return (
    <AnimatedPressable
      onPress={handleNextScreen}
      style={[styles.container, { backgroundColor }, buttonAnimationStyle]}
    >
      <Animated.Text
        style={[styles.text, { color: textColor }, textAnimationStyle]}
      >
        Get Started
      </Animated.Text>

      <Animated.View style={[styles.arrow, arrowAnimationStyle]}>
        <Feather name="arrow-right" size={30} color={textColor} />
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: CORNERS,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
  },
  text: {
    position: "absolute",
    fontSize: FONT_SIZE,
    fontWeight: "bold",
  },
});
