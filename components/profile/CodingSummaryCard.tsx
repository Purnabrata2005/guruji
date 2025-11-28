import React from "react";
import { StyleSheet, View } from "react-native";

import { Card } from "@/components/ui/card";
import { Text as NText } from "@/components/ui/text";
import { useColor } from "@/hooks/useColor";
import { CodingStats } from "@/types";

interface CodingSummaryCardProps {
  stats: CodingStats;
}
const ProgressBar = ({
  progress,
  color,
  trackColor,
}: {
  progress: number;
  color: string;
  trackColor: string;
}) => (
  <View style={[styles.progressTrack, { backgroundColor: trackColor }]}>
    <View
      style={[
        styles.progressBar,
        {
          width: `${Math.min(Math.max(progress, 0), 100)}%`,
          backgroundColor: color,
        },
      ]}
    />
  </View>
);

const DifficultyRow = ({
  label,
  solved,
  total,
  color,
  stats,
  textColor,
  mutedColor,
}: {
  label: string;
  solved: number;
  total: number;
  color: string;
  stats: { attempting: number; unsolved: number; accepted: number };
  textColor: string;
  mutedColor: string;
}) => {
  const progress = total > 0 ? (solved / total) * 100 : 0;

  return (
    <View style={styles.difficultyRow}>
      {/* Label: Easy / Medium / Hard */}
      <View style={styles.difficultyHeader}>
        <NText style={[styles.difficultyLabel, { color }]}>{label}</NText>

        <NText style={[styles.difficultyCount, { color: textColor }]}>
          <NText style={{ fontWeight: "bold" }}>{solved}</NText>/{total} solved
        </NText>
      </View>

      {/* Progress Bar */}
      <ProgressBar
        progress={progress}
        color={color}
        trackColor={`${color}20`}
      />

      {/* Attempting / Unsolved / Accepted */}
      <View style={styles.statsFooter}>
        <NText style={[styles.statsText, { color: mutedColor }]}>
          Attempting {stats.attempting} • Unsolved {stats.unsolved} • Accepted{" "}
          {stats.accepted}%
        </NText>
      </View>
    </View>
  );
};

const CodingSummaryCard = ({ stats }: CodingSummaryCardProps) => {
  const backgroundColor = useColor("card");
  const borderColor = useColor("border");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");

  const greenColor = useColor("green");
  const yellowColor = useColor("yellow");
  const redColor = useColor("red");

  return (
    <Card style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <NText style={[styles.headerLabel, { color: mutedColor }]}>
            Total Solved
          </NText>

          <NText style={[styles.totalCount, { color: textColor }]}>
            {stats.totalSolved}
            <NText style={[styles.totalTotal, { color: mutedColor }]}>
              /{stats.totalProblems} problems
            </NText>
          </NText>
        </View>

        <View style={styles.acceptanceContainer}>
          <NText
            style={[
              styles.headerLabel,
              { color: mutedColor, textAlign: "right" },
            ]}>
            Acceptance
          </NText>

          <NText style={[styles.acceptanceRate, { color: redColor }]}>
            {stats.acceptanceRate}%
          </NText>
        </View>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: borderColor }]} />

      {/* Difficulty Rows */}
      <View style={styles.difficultiesContainer}>
        <DifficultyRow
          label="Easy"
          solved={stats.easy.solved}
          total={stats.easy.total}
          color={greenColor}
          stats={stats.easy}
          textColor={textColor}
          mutedColor={mutedColor}
        />

        <DifficultyRow
          label="Medium"
          solved={stats.medium.solved}
          total={stats.medium.total}
          color={yellowColor}
          stats={stats.medium}
          textColor={textColor}
          mutedColor={mutedColor}
        />

        <DifficultyRow
          label="Hard"
          solved={stats.hard.solved}
          total={stats.hard.total}
          color={redColor}
          stats={stats.hard}
          textColor={textColor}
          mutedColor={mutedColor}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { padding: 20 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerLabel: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    marginBottom: 4,
  },
  totalCount: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
  },
  totalTotal: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  acceptanceContainer: { alignItems: "flex-end" },
  acceptanceRate: { fontSize: 18, fontFamily: "Inter-Bold" },

  divider: {
    height: 1,
    width: "100%",
    marginBottom: 12,
    opacity: 0.8,
  },

  difficultiesContainer: { gap: 2 },
  difficultyRow: { gap: 4 },
  difficultyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  difficultyLabel: { fontSize: 14, fontFamily: "Inter-Bold" },
  difficultyCount: { fontSize: 12, fontFamily: "Inter-Regular" },

  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },

  statsFooter: {},
  statsText: {
    fontSize: 11,
    fontFamily: "Inter-Regular",
  },
});

export default CodingSummaryCard;
