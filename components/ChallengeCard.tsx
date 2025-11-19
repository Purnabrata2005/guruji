import { ArrowRight, Calendar } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";

import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text as NText } from "@/components/ui/text";
import { useColor } from "@/hooks/useColor";
import { FONT_SIZE } from "@/theme/globals";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Badge } from "./badge";
import { Button } from "./ui/button";
type IoniconName = keyof typeof Ionicons.glyphMap;
interface Challenge {
  id: string;
  number: number;
  title: string;
  badge: IoniconName | null;
  isActive: boolean;
  endDate: string;
}

interface ChallengeCardProps {
  challenge: Challenge;
  onPress: () => void;
}

const ChallengeCard = ({ challenge, onPress }: ChallengeCardProps) => {
  const cardColor = useColor("card");
  const borderColor = useColor("border");
  const textColor = useColor("text");
  const textColorMuted = useColor("textMuted");
  const primaryColor = useColor("primary"); // Used for the number badge background
  const greenColor = useColor("green"); // Used for the 'Active' tag

  // Specific color for the Spark badge text
  const sparkBadgeColor = useColor("red"); // Assuming Spark uses the red/destructive color for contrast

  return (
    <Card style={styles.challengeCard}>
      {/* TOP ROW: Number Badge, Title, Active Tag */}
      <View style={styles.challengeHeader}>
        <View style={styles.challengeTitleRow}>
          {/* Number Badge (1, 2, 3) */}
          <Badge
            style={{
              backgroundColor: primaryColor + "30",
              borderColor: primaryColor + "40",
              borderWidth: 1,
              marginRight: 6,
            }}
            variant="secondary">
            {challenge.number}
          </Badge>
          {/* <View
            style={[
              styles.challengeNumberBadge,
              { backgroundColor: primaryColor },
            ]}>
            <NText style={styles.challengeNumber}>{challenge.number}</NText>
          </View> */}

          {/* Title with Badge/Highlight */}
          <NText style={[styles.challengeTitle, { color: textColor }]}>
            {challenge.title}
          </NText>
        </View>

        {/* Active Tag */}
        {challenge.isActive && (
          // <View style={[styles.activeTag, { backgroundColor: "#DCFCE7" }]}>
          //   {" "}
          //   {/* Light green background for Active tag */}
          //   <Icon name={Zap} size={14} color={greenColor} />
          //   <NText style={[styles.activeText, { color: greenColor }]}>
          //     Active
          //   </NText>
          // </View>
          <Badge icon="flash" variant="default">
            Active
          </Badge>
        )}
      </View>

      {/* FOOTER ROW: Date and Join Button */}
      <View style={styles.challengeFooter}>
        <View style={styles.dateContainer}>
          <Icon name={Calendar} size={14} color={textColorMuted} />
          <NText style={[styles.dateText, { color: textColorMuted }]}>
            {challenge.endDate}
          </NText>
        </View>

        <Button variant="outline" size="sm">
          <NText
            style={[
              styles.joinButtonText,
              {
                fontSize: FONT_SIZE - 5,
              },
            ]}>
            Join Now
          </NText>
          <Icon name={ArrowRight} size={14} color={textColorMuted} />
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  challengeCard: {
    marginBottom: 8,
    minHeight: 120,
    justifyContent: "space-between",
  },
  challengeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  challengeTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  challengeNumberBadge: {
    width: 20,
    height: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  challengeNumber: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "700",
    flexShrink: 1,
  },
  challengeTitleHighlight: {
    fontSize: 16,
    fontWeight: "900", // Making the last word extra bold
  },
  challengeBadge: {
    // This styling is for the background pill that holds the 'Spark' text
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 4,
  },
  challengeBadgeText: {
    fontSize: 16,
    fontWeight: "700",
  },
  activeTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  activeText: {
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
  },
  challengeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    fontSize: 11,
    fontWeight: "500",
  },
  joinButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  joinButtonText: {
    fontWeight: "700",
  },
});

export default ChallengeCard;
