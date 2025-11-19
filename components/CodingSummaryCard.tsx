import React from "react";
import { StyleSheet, View } from "react-native";

import { Card } from "@/components/ui/card";
import { Text as NText } from "@/components/ui/text";
import { useColor } from "@/hooks/useColor";

interface CodingStats {
  totalSolved: number;
  totalProblems: number;
  acceptanceRate: number;
  easy: {
    solved: number;
    total: number;
    attempting: number;
    unsolved: number;
    accepted: number;
  };
  medium: {
    solved: number;
    total: number;
    attempting: number;
    unsolved: number;
    accepted: number;
  };
  hard: {
    solved: number;
    total: number;
    attempting: number;
    unsolved: number;
    accepted: number;
  };
}

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
      {/* Label Row */}
      <View style={styles.difficultyHeader}>
        <NText style={[styles.difficultyLabel, { color: color }]}>
          {label}
        </NText>
        <NText style={[styles.difficultyCount, { color: textColor }]}>
          <NText style={{ fontWeight: "bold" }}>{solved}</NText>/{total} solved
        </NText>
      </View>

      {/* Progress Bar */}
      <ProgressBar
        progress={progress}
        color={color}
        trackColor={`${color}20`} // 20 is hex opacity (~12%)
      />

      {/* Stats Footer */}
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
  const backgroundColor = useColor("card"); // or 'background' depending on your theme
  const borderColor = useColor("border");
  const textColor = useColor("text");
  const mutedColor = useColor("textMuted");

  const greenColor = useColor("green"); // For Easy
  const yellowColor = useColor("yellow"); // For Medium (looks orange/yellow in image)
  const redColor = useColor("red"); // For Hard

  return (
    <Card style={styles.card}>
      {/* Header Section */}
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

      {/* Difficulty Sections */}
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
          color={yellowColor} // Using yellow to match "Medium" usually
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
  card: {
    padding: 20,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    marginBottom: 4,
  },
  totalCount: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
  },
  totalTotal: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  acceptanceContainer: {
    alignItems: "flex-end",
  },
  acceptanceRate: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },

  divider: {
    height: 1,
    width: "100%",
    marginBottom: 12,
    opacity: 0.8,
  },

  // Difficulties
  difficultiesContainer: {
    gap: 2,
  },
  difficultyRow: {
    gap: 4,
  },
  difficultyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  difficultyLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
  },
  difficultyCount: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    opacity: 1,
  },

  // Progress Bar
  progressTrack: {
    height: 8,
    width: "100%",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },

  // Stats Footer
  statsFooter: {
    marginTop: 0,
  },
  statsText: {
    fontSize: 11,
    fontFamily: "Poppins-Regular",
  },
});

export default CodingSummaryCard;
