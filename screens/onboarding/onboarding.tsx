import React, { memo, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { data, type Data } from "@/data/screens";
import { useColor } from "@/hooks/useColor";
import { FONT_SIZE } from "@/theme/globals";
import { OnboardingButton } from "./OnboardingButton";
import { Pagination } from "./OnboardingPagination";

type RenderItemProps = {
  item: Data;
  index: number;
  x: SharedValue<number>;
  backgroundColor: string;
  textColor: string;
};

const RenderItem = memo(
  ({ item, index, x, backgroundColor, textColor }: RenderItemProps) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions();

    const imageAnimatedStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP
      );

      const translateXAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, -100],
        Extrapolation.CLAMP
      );

      return {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.8,
        opacity: opacityAnimation,
        transform: [{ translateX: translateXAnimation }],
      };
    });

    const textAnimatedStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP
      );

      const translateXAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, -100],
        Extrapolation.CLAMP
      );

      return {
        opacity: opacityAnimation,
        transform: [{ translateX: translateXAnimation }],
      };
    });

    return (
      <View
        style={[
          styles.itemContainer,
          { width: SCREEN_WIDTH, backgroundColor: backgroundColor },
        ]}
      >
        <Animated.Image
          source={item.image}
          style={imageAnimatedStyle}
          resizeMode="contain"
        />

        <Animated.View style={textAnimatedStyle}>
          <Text style={[styles.itemTitle, { color: textColor }]}>
            {item.title}
          </Text>
          <Text style={[styles.itemText, { color: textColor }]}>
            {item.text}
          </Text>
        </Animated.View>
      </View>
    );
  }
);

const viewabilityConfig = {
  itemVisiblePercentThreshold: 50,
};

export function Onboarding() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef<FlatList>();

  const flatListIndex = useSharedValue(0);
  const x = useSharedValue(0);

  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems[0]) {
        flatListIndex.value = viewableItems[0].index ?? 0;
      }
    },
    []
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Animated.FlatList
        ref={flatListRef as any}
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <RenderItem
            index={index}
            item={item}
            x={x}
            backgroundColor={backgroundColor}
            textColor={textColor}
          />
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      <View style={styles.footerContainer}>
        <Pagination data={data} screenWidth={SCREEN_WIDTH} x={x} />
        <OnboardingButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  itemText: {
    textAlign: "center",
    lineHeight: 22,
    marginHorizontal: 30,
    fontSize: FONT_SIZE,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    paddingHorizontal: 10,
  },
});
