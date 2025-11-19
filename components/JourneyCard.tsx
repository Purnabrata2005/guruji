import { Ionicons } from "@expo/vector-icons";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text as NText } from "@/components/ui/text";
import { useColor } from "@/hooks/useColor";
import { Colors } from "@/theme/colors";

type IoniconName = keyof typeof Ionicons.glyphMap;
type ColorKey = keyof typeof Colors.light;

export interface JourneyItem {
  id: string;
  title: string;
  subtitle: string;
  icon: IoniconName;
  iconColor: ColorKey;
}

interface JourneyCardProps {
  item: JourneyItem;
  onPress?: () => void;
}

const JourneyCard = ({ item, onPress }: JourneyCardProps) => {
  const backgroundColor = useColor("background");
  const borderColor = useColor("border");
  const titleColor = useColor("text");
  const subtitleColor = useColor("textMuted");
  const chevronColor = useColor("icon");
  const iconColor = useColor(item.iconColor);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.container}>
          {/* Left Content: Icon, Title, Subtitle */}
          <View style={styles.leftContent}>
            {/* Top Row: Icon + Title */}
            <View style={styles.headerRow}>
              <Ionicons
                name={item.icon}
                size={24}
                color={iconColor}
                style={styles.icon}
              />
              <NText style={[styles.title, { color: titleColor }]}>
                {item.title}
              </NText>
            </View>

            {/* Bottom Row: Subtitle (Aligned with icon start) */}
            <NText
              style={[styles.subtitle, { color: subtitleColor }]}
              numberOfLines={1}>
              {item.subtitle}
            </NText>
          </View>

          {/* Right Side: Chevron (Vertically Centered) */}
          <Icon name={ChevronRight} size={20} color={chevronColor} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    elevation: 0,
    shadowOpacity: 0,
  },
  container: {
    flexDirection: "row",
    alignItems: "center", // Vertically center the chevron relative to the left content
    justifyContent: "space-between",
  },
  leftContent: {
    flex: 1,
    flexDirection: "column",
    paddingRight: 12, // Prevent text touching chevron
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6, // Space between header and subtitle
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    lineHeight: 18,
  },
});

export default JourneyCard;
