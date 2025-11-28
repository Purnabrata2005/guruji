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

import MasteryCard from "@/components/MasteryCard";
import ProblemCard, { Problem } from "@/components/ProblemCard";
import { Card } from "@/components/ui/card";
import { Text as NText } from "@/components/ui/text";
import { useColor } from "@/hooks/useColor";

const ProblemsScreen = () => {
  // --- Theme Colors ---
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const textColorMuted = useColor("textMuted");
  const borderColor = useColor("border");
  const cardBg = useColor("card");
  const searchBg = useColor("card"); // Or a specific input bg if defined

  // --- State ---
  const [refreshing, setRefreshing] = useState(false);

  // --- Mock Data ---
  const problems: Problem[] = [
    {
      id: "1",
      title: "Next Bigger Digit Challenge",
      difficulty: "MEDIUM",
      acceptance: 19.2,
      status: null,
    },
    {
      id: "2",
      title: "Race to Zero",
      difficulty: "MEDIUM",
      acceptance: 30.0,
      status: null,
    },
    {
      id: "3",
      title: "GCD Guardian",
      difficulty: "EASY",
      acceptance: 45.5,
      status: "Attempted",
    },
    {
      id: "4",
      title: "Binary Search Basics",
      difficulty: "EASY",
      acceptance: 62.1,
      status: null,
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={styles.container}>
        {/* Main List */}
        <FlatList
          data={problems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ProblemCard
              problem={item}
              onPress={() => console.log(item.title)}
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
            <View style={styles.headerComponent}>
              {/* 1. Header Text */}
              <View style={styles.header}>
                <NText style={[styles.headerTitle, { color: textColor }]}>
                  Coding Problems
                </NText>
                <NText
                  style={[styles.headerSubtitle, { color: textColorMuted }]}>
                  Sharpen your skills with practice
                </NText>
              </View>

              {/* 2. Bytes Card */}
              <Card style={styles.bytesCard}>
                <View style={styles.bytesLeft}>
                  <Ionicons name="wallet" size={20} color="#F97316" />
                  <NText style={[styles.bytesLabel, { color: textColor }]}>
                    Bytes
                  </NText>
                </View>
                <View style={styles.bytesRight}>
                  <View style={styles.currencyItem}>
                    <Ionicons name="diamond" size={16} color="#A855F7" />
                    <NText style={[styles.currencyValue, { color: textColor }]}>
                      99
                    </NText>
                  </View>
                  <View style={[styles.currencyItem, styles.coinItem]}>
                    <Ionicons name="logo-bitcoin" size={16} color="#EAB308" />
                    <NText style={[styles.currencyValue, { color: textColor }]}>
                      0
                    </NText>
                  </View>
                </View>
              </Card>

              {/* 3. Mastery Cards (Horizontal Scroll) */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.masteryScrollContent}
                style={styles.masteryScroll}>
                <MasteryCard
                  title="Master Interview"
                  completedProblems={0}
                  totalProblems={25}
                />
                <MasteryCard
                  title="Array Mastery"
                  completedProblems={0}
                  totalProblems={14}
                />
              </ScrollView>

              {/* 4. Search Bar */}
              <View
                style={[
                  styles.searchContainer,
                  { backgroundColor: searchBg, borderColor },
                ]}>
                <Ionicons
                  name="search"
                  size={20}
                  color={textColorMuted}
                  style={styles.searchIcon}
                />
                <TextInput
                  placeholder="Search problems..."
                  placeholderTextColor={textColorMuted}
                  style={[styles.searchInput, { color: textColor }]}
                />
              </View>

              {/* 5. Filter Button */}
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  { backgroundColor: cardBg, borderColor },
                ]}>
                <Ionicons name="filter" size={18} color={textColor} />
                <NText style={[styles.filterText, { color: textColor }]}>
                  Filters
                </NText>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 100,
  },
  headerComponent: {
    marginBottom: 8, // Spacing before first problem item
  },

  // Header
  header: {
    marginTop: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
  },

  // Bytes Card
  bytesCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    elevation: 0,
    shadowOpacity: 0,
  },
  bytesLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bytesLabel: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
  },
  bytesRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F3F4F6", // Light gray background for values
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  coinItem: {
    backgroundColor: "#FEF9C3", // Light yellow bg for coin
  },
  currencyValue: {
    fontSize: 14,
    fontFamily: "Rubik-Bold",
  },

  // Mastery Scroll
  masteryScroll: {
    marginBottom: 20,
  },
  masteryScrollContent: {
    gap: 16,
  },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    height: "100%",
  },

  // Filter Button
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    marginBottom: 24,
  },
  filterText: {
    fontSize: 14,
    fontFamily: "Rubik-Medium",
  },
});

export default ProblemsScreen;
