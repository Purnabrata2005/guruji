import { Star, Trophy } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import JourneyCard from "@/components/JourneyCard";
// import { FeaturedTestCard, ChallengeCard } from "@/components/TestCard";
import ChallengeCard from "@/components/ChallengeCard";
import { FeaturedTestCard } from "@/components/TestCard";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text as NText } from "@/components/ui/text";
import { JOURNEY_ITEMS } from "@/constants/data";
import { useColor } from "@/hooks/useColor";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Test {
  id: string;
  title: string;
  description: string;
  questions_count: number;
  duration?: number;
  difficulty?: "easy" | "medium" | "hard";
  completed?: boolean;
  score?: number;
  created_at: string;
}

const HomeScreen = () => {
  const profile = {
    name: "Nandan Manna",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };
  const [refreshing, setRefreshing] = useState(false);

  // --- Colors ---
  const backgroundColor = useColor("background");
  const cardColor = useColor("card");
  const textColorMuted = useColor("textMuted");
  const textColor = useColor("text");
  const yellowColor = useColor("yellow");
  const greenColor = useColor("green");
  const primaryColor = useColor("primary");
  const borderColor = useColor("border");

  const tests: Test[] = [
    {
      id: "1",
      title: "General Knowledge Test",
      description:
        "Test your basic general knowledge with 20 important questions.",
      questions_count: 20,
      duration: 15,
      difficulty: "easy",
      completed: true,
      score: 88,
      created_at: "2025-01-01",
    },
    {
      id: "2",
      title: "Math Aptitude",
      description: "Solve medium-level math aptitude questions.",
      questions_count: 25,
      duration: 20,
      difficulty: "medium",
      completed: false,
      created_at: "2025-01-05",
    },
    {
      id: "3",
      title: "Computer Fundamentals",
      description: "Covers basics of computer hardware and software.",
      questions_count: 30,
      duration: 25,
      difficulty: "hard",
      completed: false,
      created_at: "2025-01-08",
    },
  ];
  // src/constants/challengesData.ts
  interface Challenge {
    id: string;
    number: number;
    title: string;
    badge: keyof typeof Ionicons.glyphMap | null;
    isActive: boolean;
    endDate: string;
  }
  // Add this inside the HomeScreen component (or import it if saved externally)
  const challenges: Challenge[] = [
    {
      id: "1",
      number: 1,
      title: "35 Days React Spark",
      badge: "flash",
      isActive: true,
      endDate: "Ends Nov 21",
    },
    {
      id: "2",
      number: 2,
      title: "25 Days JS Challenge : Part 2",
      badge: "flash",
      isActive: true,
      endDate: "Ends Nov 30",
    },
    {
      id: "3",
      number: 3,
      title: "Web Dev: Bunny",
      badge: null,
      isActive: true,
      endDate: "Ends Dec 9",
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // --- List Footer Component (The Continue Your Journey Section) ---
  const ListFooter = () => (
    <View style={styles.headerPadding}>
      <View style={styles.sectionContainer}>
        <NText
          style={[styles.sectionTitle, { color: textColor, marginBottom: 12 }]}>
          Continue your journey
        </NText>

        {JOURNEY_ITEMS.map(item => (
          <JourneyCard
            key={item.id}
            item={item}
            onPress={() => console.log("Navigating to:", item.title)}
          />
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <FlatList
        data={challenges}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.testCardContainer}>
            <ChallengeCard challenge={item} onPress={() => {}} />
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={textColor}
          />
        }
        // --- CONTENT BEFORE THE MAIN LIST ---
        ListHeaderComponent={
          <View>
            {/* 1. TOP BAR */}
            <View
              style={[
                styles.topBar,
                { borderColor: borderColor, backgroundColor: backgroundColor },
              ]}>
              <View style={styles.textContainer}>
                <NText style={[styles.greetingText, { color: textColor }]}>
                  Good evening!
                </NText>
                <NText
                  style={[styles.subGreetingText, { color: textColorMuted }]}>
                  Ready to code?
                </NText>
              </View>

              <View style={[styles.profileRing, { borderColor: borderColor }]}>
                <Image
                  source={{ uri: profile.avatar }}
                  width={40}
                  height={40}
                  style={{ borderRadius: 20 }}
                />
              </View>
            </View>

            <View style={styles.headerPadding}>
              {/* 2. PROGRESS SECTION */}
              <View style={styles.sectionContainer}>
                <NText
                  variant="title"
                  style={[styles.sectionTitle, { color: textColor }]}>
                  Your Progress
                </NText>

                <View style={styles.cardsContainer}>
                  {/* Total XP Card */}
                  <Card
                    style={{
                      ...styles.cardStyle,
                      backgroundColor: cardColor,
                      borderColor: borderColor,
                    }}>
                    <View style={styles.cardHeader}>
                      <NText
                        variant="caption"
                        style={[styles.cardLabel, { color: textColorMuted }]}>
                        Total XP
                      </NText>
                      <Icon name={Star} color={yellowColor} size={20} />
                    </View>
                    <NText style={[styles.cardValue, { color: textColor }]}>
                      0
                    </NText>
                  </Card>

                  {/* Live Challenges Card */}
                  <Card
                    style={{
                      ...styles.cardStyle,
                      backgroundColor: cardColor,
                      borderColor: borderColor,
                    }}>
                    <View style={styles.cardHeader}>
                      <NText
                        variant="caption"
                        style={[styles.cardLabel, { color: textColorMuted }]}>
                        Live Challenges
                      </NText>
                      <Icon name={Trophy} color={greenColor} size={20} />
                    </View>
                    <NText style={[styles.cardValue, { color: textColor }]}>
                      4
                    </NText>
                  </Card>
                </View>
              </View>

              {/* 3. FEATURED SECTION */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <NText
                    variant="title"
                    style={[styles.sectionTitle, { color: textColor }]}>
                    Featured Tests
                  </NText>
                  <TouchableOpacity>
                    <NText style={[styles.seeAllText, { color: primaryColor }]}>
                      See all
                    </NText>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={tests}
                  renderItem={({ item }) => (
                    <FeaturedTestCard
                      item={item}
                      onPress={() => console.log("Featured pressed")}
                    />
                  )}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalListContent}
                />
              </View>

              {/* 4. OUR RECOMMENDATION TITLE (LAST ELEMENT BEFORE THE LIST ITEMS START) */}
              <View style={[styles.sectionContainer, { marginBottom: 12 }]}>
                <View style={styles.sectionHeader}>
                  <NText
                    variant="title"
                    style={[styles.sectionTitle, { color: textColor }]}>
                    Our Recommendation
                  </NText>
                  <TouchableOpacity>
                    <NText style={[styles.seeAllText, { color: primaryColor }]}>
                      See all
                    </NText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        }
        // --- CONTENT AFTER THE MAIN LIST ---
        ListFooterComponent={ListFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 100,
  },
  // --- Top Bar Styles ---
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 14,
    paddingTop: 12,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: "column",
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "900",
  },
  subGreetingText: {
    fontSize: 14,
    fontWeight: "600",
  },
  profileRing: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  // --- Progress Cards (Bottles) ---
  cardsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  cardStyle: {
    flex: 1,
    borderWidth: 1,
    elevation: 0,
    shadowOpacity: 0,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardValue: {
    fontSize: 24,
    marginTop: 4,
    fontWeight: "bold",
  },

  // --- Sections & Lists ---
  headerPadding: {
    paddingHorizontal: 14,
  },
  sectionContainer: {
    marginBottom: 20,
    marginTop: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
  },
  horizontalListContent: {
    gap: 16,
  },
  testCardContainer: {
    paddingHorizontal: 14,
  },
});

export default HomeScreen;
