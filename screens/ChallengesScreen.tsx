import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FullChallengeCard from "@/components/challenges/FullChallengeCard";
import { Text as NText } from "@/components/ui/text";
import { fullChallenges } from "@/constants/data";
import { useColor } from "@/hooks/useColor";

const ChallengesScreen = () => {
  // Colors
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textColorMuted = useColor("textMuted");
  const borderColor = useColor("border");
  const cardBg = useColor("card");

  // Filters
  const [activeFilter, setActiveFilter] = useState("Active");
  const filters = ["Active", "Upcoming", "Expired", "All"];

  // Refreshing
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={styles.container}>
        {/* HEADER */}
        <View
          style={[
            styles.header,
            { borderColor: borderColor, backgroundColor },
          ]}>
          <NText style={[styles.headerTitle, { color: textColor }]}>
            Challenges
          </NText>
          <NText style={[styles.headerSubtitle, { color: textColorMuted }]}>
            Push your limits, earn rewards
          </NText>
        </View>

        <FlatList
          data={fullChallenges}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <FullChallengeCard
              challenge={item}
              onPress={() => console.log("Pressed", item.title)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={textColor}
            />
          }
          ListHeaderComponent={
            <View>
              {/* SEARCH BAR */}
              <View
                style={[
                  styles.searchContainer,
                  { backgroundColor: cardBg, borderColor },
                ]}>
                <Ionicons
                  name="search"
                  size={20}
                  color={textColorMuted}
                  style={styles.searchIcon}
                />
                <TextInput
                  placeholder="Search challenges..."
                  placeholderTextColor={textColorMuted}
                  style={[styles.searchInput, { color: textColor }]}
                />
              </View>

              {/* FILTER TABS */}
              <View style={styles.filterWrapper}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filterContent}>
                  {filters.map(filter => {
                    const isActive = activeFilter === filter;

                    // Filter icons
                    const iconMap: Record<
                      string,
                      keyof typeof Ionicons.glyphMap
                    > = {
                      Active: "flash",
                      Upcoming: "time",
                      Expired: "hourglass",
                      All: "trophy",
                    };

                    return (
                      <TouchableOpacity
                        key={filter}
                        onPress={() => setActiveFilter(filter)}
                        style={[
                          styles.filterChip,
                          isActive
                            ? {
                                backgroundColor: "#FFEFE1",
                                borderColor: "#F97316",
                              }
                            : {
                                backgroundColor: "transparent",
                                borderColor,
                              },
                        ]}>
                        <Ionicons
                          name={iconMap[filter]}
                          size={16}
                          color={isActive ? "#F97316" : textColorMuted}
                          style={{ marginRight: 6 }}
                        />

                        <NText
                          style={[
                            styles.filterText,
                            {
                              color: isActive ? "#F97316" : textColorMuted,
                              fontWeight: isActive ? "700" : "500",
                            },
                          ]}>
                          {filter}
                        </NText>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },

  container: {
    flex: 1,
    paddingHorizontal: 14,
  },

  // Header
  header: {
    paddingBottom: 12,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "900",
  },
  headerSubtitle: {
    fontSize: 12,
  },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    height: "100%",
  },

  // Filters
  filterWrapper: {
    marginBottom: 20,
  },
  filterContent: {
    gap: 12,
    alignItems: "center",
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },

  // List padding
  listContent: {
    paddingBottom: 60,
  },
});

export default ChallengesScreen;
