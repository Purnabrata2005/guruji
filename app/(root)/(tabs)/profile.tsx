import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { Star } from "lucide-react-native"; // Import icons
import React from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CodingSummaryCard from "@/components/CodingSummaryCard";
import GroupedList from "@/components/GroupedList";
import JourneyCard, { JourneyItem } from "@/components/JourneyCard";
import { Card } from "@/components/ui/card"; // Import Card
import { Icon } from "@/components/ui/icon"; // Import Icon helper

import { Text as NText } from "@/components/ui/text";
import icons from "@/constants/icons";
import { useColor } from "@/hooks/useColor";

// --- Data Types ---
interface SectionHeader {
  type: "header";
  title: string;
}

interface BadgeSection {
  type: "badges";
}

interface GroupedSection {
  type: "grouped-list";
  items: JourneyItem[];
}

type ProfileListItem =
  | JourneyItem
  | SectionHeader
  | BadgeSection
  | GroupedSection;

const Profile = () => {
  // --- Hooks ---

  // Fallback user data
  const user = {
    name: "Nandan Manna",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "nandan7602831377@gmail.com",
  };

  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textColorMuted = useColor("textMuted");
  const primaryColor = useColor("blue");
  const cardColor = useColor("card"); // Added card color
  const yellowColor = useColor("yellow"); // Added yellow
  const greenColor = useColor("green"); // Added green
  const borderColor = useColor("border"); // Added border color

  // --- Mock Data for Coding Summary ---
  const codingStats = {
    totalSolved: 0,
    totalProblems: 578,
    acceptanceRate: 0,
    easy: { solved: 0, total: 141, attempting: 1, unsolved: 141, accepted: 0 },
    medium: {
      solved: 0,
      total: 338,
      attempting: 0,
      unsolved: 338,
      accepted: 0,
    },
    hard: { solved: 0, total: 99, attempting: 0, unsolved: 99, accepted: 0 },
  };

  // --- Profile Header Component ---
  const ProfileHeader = () => (
    <View style={styles.headerContainer}>
      {/* 1. Avatar & Info */}
      <View style={styles.profileInfo}>
        <View style={[styles.avatarWrapper, { borderColor: primaryColor }]}>
          <Image
            source={{ uri: user.avatar }}
            style={[styles.avatar, { borderColor: backgroundColor }]}
          />
        </View>

        <View style={styles.nameRow}>
          <NText style={[styles.nameText, { color: textColor }]}>
            {user.name}
          </NText>
          <View style={[styles.betaBadge, { backgroundColor: "#DBEAFE" }]}>
            <NText style={[styles.betaText, { color: "#2563EB" }]}>Beta</NText>
          </View>
        </View>

        <NText style={[styles.emailText, { color: textColorMuted }]}>
          {user.email}
        </NText>

        {/* Google Button */}
        <View style={styles.googleButton}>
          <Image
            source={icons.google}
            style={styles.googleIcon}
            resizeMode="contain"
          />
          <NText style={styles.googleButtonText}>Connected via Google</NText>
        </View>
      </View>

      {/* 2. Progress Section (Inserted Here) */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <NText
            variant="title"
            style={[styles.sectionTitle, { color: textColor }]}>
            Progress
          </NText>
        </View>

        <View style={styles.cardsContainer}>
          {/* XP Card */}
          <Card style={styles.cardStyle}>
            <View style={styles.cardHeader}>
              <NText
                variant="caption"
                style={[styles.cardLabel, { color: textColorMuted }]}>
                XP
              </NText>
              <Icon name={Star} color={yellowColor} size={20} />
            </View>
            <NText style={[styles.cardValue, { color: textColor }]}>0</NText>
          </Card>

          {/* Byte Vault Card */}
          <Card style={styles.cardStyle}>
            <View style={styles.cardHeader}>
              <NText
                variant="caption"
                style={[styles.cardLabel, { color: textColorMuted }]}>
                Byte Vault
              </NText>
              {/* Using Ionicons here for the arrow to match screenshot style if needed, or standard icon */}
              <Ionicons
                name="chevron-forward"
                size={20}
                color={textColorMuted}
              />
            </View>
            <NText style={[styles.cardValue, { color: textColor }]}>99</NText>
          </Card>
        </View>
      </View>

      {/* 3. Coding Summary Section */}
      <View style={[styles.sectionContainer, { marginTop: 24 }]}>
        <View style={styles.sectionHeader}>
          <NText style={[styles.sectionTitle, { color: textColor }]}>
            Coding Summary
          </NText>
        </View>
        <CodingSummaryCard stats={codingStats} />
      </View>
    </View>
  );

  // --- List Data ---
  const data: ProfileListItem[] = [
    // 2. More Section
    { type: "header", title: "More" },
    {
      id: "submission",
      title: "Recent Submissions",
      subtitle: "View your coding submission history",
      icon: "code-slash",
      iconColor: "orange",
    } as JourneyItem,
    {
      id: "preferences",
      title: "Preferences",
      subtitle: "Customize your app settings and preferences",
      icon: "settings",
      iconColor: "orange",
    } as JourneyItem,
    {
      id: "bug",
      title: "Report a Bug",
      subtitle: "Found an issue? Open GitHub and file a report",
      icon: "bug",
      iconColor: "red",
    } as JourneyItem,

    // 3. Account Section
    { type: "header", title: "Account" },
    {
      type: "grouped-list",
      items: [
        {
          id: "delete",
          title: "Delete account",
          subtitle: "Opens masterji.co/delete-account",
          icon: "trash",
          iconColor: "orange",
        },
        {
          id: "privacy",
          title: "Privacy policy",
          subtitle: "How we handle and protect your data",
          icon: "document-text",
          iconColor: "orange",
        },
        {
          id: "support",
          title: "Support",
          subtitle: "Get help or email dev@chaicode.com",
          icon: "help-circle",
          iconColor: "orange",
        },
      ],
    } as GroupedSection,
  ];

  const renderHeader = (title: string) => (
    <View style={styles.sectionHeader}>
      <NText style={[styles.sectionTitle, { color: textColor }]}>{title}</NText>
    </View>
  );

  const renderItem = ({ item }: { item: ProfileListItem }) => {
    if ("type" in item && item.type === "header") {
      return <View style={{ marginTop: 12 }}>{renderHeader(item.title)}</View>;
    }

    if ("type" in item && item.type === "grouped-list") {
      return (
        <View style={styles.sectionContainer}>
          <GroupedList items={item.items} onItemPress={() => {}} />
        </View>
      );
    }

    // Standard Journey Items (More Section)
    return (
      <View>
        <JourneyCard item={item as JourneyItem} onPress={() => {}} />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          "id" in item ? item.id : `section-${index}`
        }
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ProfileHeader}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 14,
    paddingBottom: 100,
  },
  // --- Structural Styles ---
  sectionContainer: {
    marginTop: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18, // Matched to screenshot (larger bold title)
    marginLeft: 10,
    fontWeight: "bold",
  },

  // --- Header Styles ---
  headerContainer: {
    marginTop: 12,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarWrapper: {
    marginBottom: 16,
    padding: 3,
    borderWidth: 0,
    borderRadius: 60,
    backgroundColor: "#3B82F6",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
  },
  betaBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  betaText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
  emailText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginBottom: 16,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  googleIcon: {
    width: 16,
    height: 16,
  },
  googleButtonText: {
    color: "#2563EB",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },

  // --- Progress Card Styles (Matches Avatar.jpeg) ---
  cardsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cardStyle: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Medium", // Slightly bolder per screenshot
    fontWeight: "600",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
