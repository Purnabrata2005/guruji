import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Text as NText } from "@/components/ui/text";
import icons from "@/constants/icons";
import { useColor } from "@/hooks/useColor";
import Ionicons from "@expo/vector-icons/Ionicons";

// Define the Test interface
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
  // Use Global Context instead of hardcoded profile
  const profile = {
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  // Get colors from your hook
  const backgroundColor = useColor("background");
  const secondaryColor = useColor("secondary");
  const textColorMuted = useColor("textMuted");
  const textColor = useColor("text");
  const yellowColor = useColor("yellow");
  const greenColor = useColor("green");

  // Mock data for the tests
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

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {/* Header */}
      <View style={[styles.headerContainer, { backgroundColor }]}>
        <View style={styles.headerRow}>
          <View style={styles.profileRow}>
            <Image
              source={{
                uri: profile?.avatar,
              }}
              width={48}
              height={48}
              variant="circle"
            />
            <View style={styles.greetingContainer}>
              <NText style={[styles.greetingText, { color: textColorMuted }]}>
                Good Morning
              </NText>
              <NText style={[styles.profileName, { color: textColor }]}>
                {profile?.name}
              </NText>
            </View>
          </View>
          <Image source={icons.bell} width={24} height={24} variant="default" />
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressContentContainer}>
        <NText
          variant="title"
          style={[styles.progressTitle, { color: textColor }]}>
          Your progress
        </NText>

        <View style={styles.cardsContainer}>
          <Card style={styles.cardStyle}>
            <View style={styles.cardHeader}>
              <NText
                variant="caption"
                style={[styles.cardLabel, { color: textColorMuted }]}>
                Total XP
              </NText>
              <Ionicons name="star" size={20} color={yellowColor} />
            </View>
            <NText style={[styles.cardValue, { color: textColor }]}>0</NText>
          </Card>

          <Card style={styles.cardStyle}>
            <View style={styles.cardHeader}>
              <NText
                variant="caption"
                style={[styles.cardLabel, { color: textColorMuted }]}>
                Live Challenges
              </NText>
              <Ionicons name="trophy" size={20} color={greenColor} />
            </View>
            <NText style={[styles.cardValue, { color: textColor }]}>4</NText>
          </Card>
        </View>
      </View>

      {/* Tests Section */}
      {/* <ScrollView
        style={[
          styles.testsScrollContainer,
          { backgroundColor: secondaryColor },
        ]}>
        <NText style={[styles.sectionTitle, { color: textColor }]}>
          Featured Tests
        </NText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScrollContainer}>
          {tests.map(item => (
            <View key={item.id} style={styles.horizontalScrollItem}>
              <FeaturedTestCard
                item={item}
                onPress={() => console.log("Featured Test Card Pressed")}
              />
            </View>
          ))}
        </ScrollView>

        <NText style={[styles.allTestsTitle, { color: textColor }]}>
          All Tests
        </NText>

        <View style={styles.allTestsContainer}>
          {tests.map(item => (
            <TestCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 14,
    paddingTop: 16, // Match the original "mt-5"
    paddingBottom: 12, // Add some padding
    borderBottomWidth: 1.5,
    borderBottomColor: "#E5E7EB",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  greetingContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 8,
    justifyContent: "center",
  },
  greetingText: {
    fontSize: 12,
    fontFamily: "Rubik-Regular",
  },
  profileName: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
  },
  progressScrollContainer: {
    flex: 1,
  },
  progressContentContainer: {
    paddingHorizontal: 14,
    paddingTop: 6,
  },
  progressTitle: {
    fontFamily: "Rubik-Bold",
    marginBottom: 8,
  },
  cardsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cardStyle: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardLabel: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
  },
  cardValue: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
    marginTop: 8,
  },
  testsScrollContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Rubik-ExtraBold",
    marginTop: 20,
    marginLeft: 16,
  },
  horizontalScrollContainer: {
    marginTop: 16,
    paddingLeft: 16,
  },
  horizontalScrollItem: {
    marginRight: 16,
  },
  allTestsTitle: {
    fontSize: 22,
    fontFamily: "Rubik-ExtraBold",
    marginTop: 32,
    marginLeft: 16,
  },
  allTestsContainer: {
    paddingHorizontal: 16,
    marginBottom: 40,
  },
});

export default HomeScreen;
