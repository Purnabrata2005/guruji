import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Badge } from "@/components/badge";
import { Card } from "@/components/ui/card";
import { Text as NText } from "@/components/ui/text";
import { useColor } from "@/hooks/useColor";
import { FullChallenge } from "@/types";

interface FullChallengeCardProps {
  challenge: FullChallenge;
  onPress?: () => void;
}

const FullChallengeCard = ({ challenge, onPress }: FullChallengeCardProps) => {
  // --- Theme Colors ---
  const borderColor = useColor("border");
  const textColor = useColor("text");
  const textColorMuted = useColor("textMuted");
  const cardColor = useColor("card");

  const getPlatformBadgeVariant = (platform: string) => {
    switch (platform) {
      case "YOUTUBE":
        return "warning";
      case "UDEMY":
        return "warning";
      default:
        return "outline";
    }
  };

  // Returns the correct variant for the status badge (Active = Green)
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "success-filled"; // Solid green for active
      default:
        return "ghost";
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={styles.card}>
        {/* --- Header Row: Platform & Status --- */}
        <View style={styles.headerRow}>
          <Badge
            variant={"default"}
            // Using a play icon for YouTube/Video platforms
            icon={"sparkles"}>
            {challenge.platform}
          </Badge>

          <Badge variant={"destructive"} icon={"book"}>
            {challenge.status}
          </Badge>
        </View>

        {/* --- Main Content: Title & Subtitle --- */}
        <View style={styles.contentContainer}>
          <NText style={[styles.title, { color: textColor }]}>
            {challenge.title}
          </NText>

          <View style={styles.subtitleRow}>
            {/* Placeholder logo icon for the challenge topic */}
            <Ionicons
              name="logo-react"
              size={18}
              color="#8B5CF6"
              style={styles.subtitleIcon}
            />
            <NText style={[styles.subtitle, { color: textColorMuted }]}>
              {challenge.subtitle}
            </NText>
          </View>
        </View>

        {/* --- Tags Row (Daily / Rewards) --- */}
        <View style={styles.tagsRow}>
          {/* Frequency Tag (Gray) */}
          <View style={styles.grayTag}>
            <Ionicons
              name="calendar"
              size={12}
              color="#6B7280"
              style={{ marginRight: 4 }}
            />
            <NText style={styles.grayTagText}>{challenge.tags.frequency}</NText>
          </View>

          {/* Reward Tag (Yellow/Gold) */}
          {challenge.tags.reward && (
            <View style={styles.goldTag}>
              <Ionicons
                name="trophy"
                size={12}
                color="#D97706"
                style={{ marginRight: 4 }}
              />
              <NText style={styles.goldTagText}>{challenge.tags.reward}</NText>
            </View>
          )}
        </View>

        {/* --- Footer: Date & View Button --- */}
        <View style={styles.footerRow}>
          <View style={styles.dateContainer}>
            <Ionicons
              name="time-outline"
              size={14}
              color={textColorMuted}
              style={{ marginRight: 4 }}
            />
            <NText style={[styles.dateText, { color: textColorMuted }]}>
              {challenge.dateRange}
            </NText>
          </View>

          <TouchableOpacity style={[styles.viewButton, { borderColor }]}>
            <NText style={[styles.viewText, { color: textColor }]}>View</NText>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={textColor}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  contentContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    marginBottom: 6,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleIcon: {
    marginRight: 6,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  // Custom tag styles to match image exactly
  grayTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  grayTagText: {
    color: "#6B7280",
    fontSize: 11,
    fontFamily: "Inter-Medium",
  },
  goldTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  goldTagText: {
    color: "#D97706",
    fontSize: 11,
    fontFamily: "Inter-Medium",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    borderWidth: 1,
  },
  viewText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
});

export default FullChallengeCard;
