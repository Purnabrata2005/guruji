import { Ionicons } from "@expo/vector-icons";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text as NText } from "@/components/ui/text";
import { useColor } from "@/hooks/useColor";
import { JourneyItem } from "@/types";

interface GroupedListProps {
  items: JourneyItem[];
  onItemPress: (item: JourneyItem) => void;
}

const GroupedList = ({ items, onItemPress }: GroupedListProps) => {
  const backgroundColor = useColor("background");
  const borderColor = useColor("border");
  const titleColor = useColor("text");
  const subtitleColor = useColor("textMuted");
  const chevronColor = useColor("icon");

  return (
    <Card style={styles.cardContainer}>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        const iconColor = useColor(item.iconColor);

        return (
          <View key={item.id}>
            <TouchableOpacity
              onPress={() => onItemPress(item)}
              activeOpacity={0.7}
              style={styles.itemContainer}>
              {/* Left Side: Icon, Title, Subtitle */}
              <View style={styles.leftContent}>
                {/* Header: Icon + Title */}
                <View style={styles.headerRow}>
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={iconColor}
                    style={styles.icon}
                  />
                  <NText style={[styles.title, { color: titleColor }]}>
                    {item.title}
                  </NText>
                </View>

                {/* Subtitle: Below header, aligned with icon */}
                <NText
                  style={[styles.subtitle, { color: subtitleColor }]}
                  numberOfLines={1}>
                  {item.subtitle}
                </NText>
              </View>

              {/* Right Side: Chevron (Vertically Centered) */}
              <Icon name={ChevronRight} size={18} color={chevronColor} />
            </TouchableOpacity>

            {/* Divider line */}
            {!isLastItem && (
              <View
                style={[styles.divider, { backgroundColor: borderColor }]}
              />
            )}
          </View>
        );
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 0,
    overflow: "hidden",
    elevation: 0,
    shadowOpacity: 0,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row", // Main direction row to separate Left Content and Chevron
    alignItems: "center", // Vertically center the chevron
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  leftContent: {
    flex: 1,
    flexDirection: "column",
    paddingRight: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4, // Space between header row and subtitle
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: "Inter-Medium",
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    lineHeight: 16,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
    opacity: 0.5,
  },
});

export default GroupedList;
