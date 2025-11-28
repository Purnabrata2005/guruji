import { Ionicons } from "@expo/vector-icons";
import { Star } from "lucide-react-native";
import React from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GroupedList from "@/components/GroupedList";
import CodingSummaryCard from "@/components/profile/CodingSummaryCard";
import JourneyCard from "@/components/profile/JourneyCard";

import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text as NText } from "@/components/ui/text";

import { codingStats, profileListData, profileUser } from "@/constants/data";
import icons from "@/constants/icons";
import { useColor } from "@/hooks/useColor";
import { JourneyItem, ProfileListItem } from "@/types";

const ProfileScreen = () => {
  // Colors
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textColorMuted = useColor("textMuted");
  const primaryColor = useColor("blue");
  const yellowColor = useColor("yellow");

  const ProfileHeader = () => (
    <View style={styles.headerContainer}>
      {/* Avatar & User Info */}
      <View style={styles.profileInfo}>
        <View style={[styles.avatarWrapper, { backgroundColor: primaryColor }]}>
          <Image
            source={{ uri: profileUser.avatar }}
            style={[styles.avatar, { borderColor: backgroundColor }]}
          />
        </View>

        <View style={styles.nameRow}>
          <NText style={[styles.nameText, { color: textColor }]}>
            {profileUser.name}
          </NText>

          <View style={styles.betaBadge}>
            <NText style={styles.betaText}>Beta</NText>
          </View>
        </View>

        <NText style={[styles.emailText, { color: textColorMuted }]}>
          {profileUser.email}
        </NText>

        {/* Google Connected */}
        <View style={styles.googleButton}>
          <Image source={icons.google} style={styles.googleIcon} />
          <NText style={styles.googleButtonText}>Connected via Google</NText>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <NText style={[styles.sectionTitle, { color: textColor }]}>
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

          {/* Vault Card */}
          <Card style={styles.cardStyle}>
            <View style={styles.cardHeader}>
              <NText
                variant="caption"
                style={[styles.cardLabel, { color: textColorMuted }]}>
                Byte Vault
              </NText>
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

      {/* Coding Summary */}
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

  const renderItem = ({ item }: { item: ProfileListItem }) => {
    if ("type" in item && item.type === "header") {
      return (
        <View style={{ marginTop: 12 }}>
          <View style={styles.sectionHeader}>
            <NText style={[styles.sectionTitle, { color: textColor }]}>
              {item.title}
            </NText>
          </View>
        </View>
      );
    }

    if ("type" in item && item.type === "grouped-list") {
      return (
        <View style={styles.sectionContainer}>
          <GroupedList items={item.items} onItemPress={() => {}} />
        </View>
      );
    }

    return <JourneyCard item={item as JourneyItem} onPress={() => {}} />;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <FlatList
        data={profileListData}
        keyExtractor={(item, index) =>
          "id" in item ? item.id : `section-${index}`
        }
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={ProfileHeader}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flatListContent: { paddingHorizontal: 14, paddingBottom: 60 },

  // Header
  headerContainer: { marginTop: 12 },
  profileInfo: { alignItems: "center", marginBottom: 24 },

  avatarWrapper: {
    marginBottom: 16,
    padding: 3,
    borderRadius: 60,
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
  nameText: { fontSize: 24, fontFamily: "Inter-Bold" },

  betaBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  betaText: { fontSize: 12, color: "#2563EB", fontFamily: "Inter-Medium" },

  emailText: { fontSize: 14, marginBottom: 16, fontFamily: "Inter-Medium" },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  googleIcon: { width: 16, height: 16 },
  googleButtonText: {
    color: "#2563EB",
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },

  // Generic Sections
  sectionContainer: { marginTop: 0 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 18, marginLeft: 10, fontWeight: "bold" },

  // Cards
  cardsContainer: { flexDirection: "row", gap: 12 },
  cardStyle: { flex: 1, paddingHorizontal: 14, paddingVertical: 12 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardLabel: { fontSize: 14, fontFamily: "Inter-Medium", fontWeight: "600" },
  cardValue: { fontSize: 16, fontWeight: "bold" },
});

export default ProfileScreen;
