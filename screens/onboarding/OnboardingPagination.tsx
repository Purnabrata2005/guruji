import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { type Data } from "@/data/screens";
import { useColor } from "@/hooks/useColor";

type PaginationCompProps = {
  index: number;
  x: SharedValue<number>;
  screenWidth: number;
  activeColor: string;
};

const PaginationComp = memo(
  ({ index, x, screenWidth, activeColor }: PaginationCompProps) => {
    const animatedDotStyle = useAnimatedStyle(() => {
      const widthAnimation = interpolate(
        x.value,
        [
          (index - 1) * screenWidth,
          index * screenWidth,
          (index + 1) * screenWidth,
        ],
        [10, 20, 10],
        Extrapolation.CLAMP
      );

      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * screenWidth,
          index * screenWidth,
          (index + 1) * screenWidth,
        ],
        [0.5, 1, 0.5],
        Extrapolation.CLAMP
      );

      return {
        width: widthAnimation,
        opacity: opacityAnimation,
      };
    });

    return (
      <Animated.View
        style={[
          styles.dots,
          { backgroundColor: activeColor },
          animatedDotStyle,
        ]}
      />
    );
  }
);

type PaginationProps = {
  data: Data[];
  x: SharedValue<number>;
  screenWidth: number;
};

export function Pagination({ data, screenWidth, x }: PaginationProps) {
  const dotColor = useColor("backgroundHighlightColor");

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <PaginationComp
          key={item.id}
          index={index}
          x={x}
          screenWidth={screenWidth}
          activeColor={dotColor}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  dots: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
