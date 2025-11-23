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

import ChallengeCard from "@/components/ChallengeCard";
import JourneyCard from "@/components/JourneyCard";
import { FeaturedTestCard } from "@/components/TestCard";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Text as NText } from "@/components/ui/text";
import { homeChallenges, JOURNEY_ITEMS, tests } from "@/constants/data";
import { useColor } from "@/hooks/useColor";

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  // --- Colors ---
  const backgroundColor = useColor("background");
  const textColorMuted = useColor("textMuted");
  const textColor = useColor("text");
  const yellowColor = useColor("yellow");
  const greenColor = useColor("green");
  const primaryColor = useColor("primary");
  const borderColor = useColor("border");

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  // --- Continue Your Journey Footer ---
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
        data={homeChallenges}
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
        ListHeaderComponent={
          <View>
            {/* TOP BAR */}
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
              {/* theme change */}
              <ModeToggle />
            </View>

            <View style={styles.headerPadding}>
              {/* PROGRESS SECTION */}
              <View style={styles.sectionContainer}>
                <NText
                  variant="title"
                  style={[styles.sectionTitle, { color: textColor }]}>
                  Your Progress
                </NText>

                <View style={styles.cardsContainer}>
                  {/* Total XP */}
                  <Card style={styles.cardStyle}>
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

                  {/* Live Challenges */}
                  <Card style={styles.cardStyle}>
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

              {/* FEATURED TESTS */}
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
                    <FeaturedTestCard item={item} onPress={() => {}} />
                  )}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalListContent}
                />
              </View>

              {/* OUR RECOMMENDATION */}
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
        ListFooterComponent={ListFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flatListContent: { paddingBottom: 100 },

  // Top Bar
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
  textContainer: { flexDirection: "column" },
  greetingText: { fontSize: 24, fontWeight: "900" },
  subGreetingText: { fontSize: 14, fontWeight: "600" },
  profileRing: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  // Progress Cards
  cardsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  cardStyle: {
    flex: 1,
    borderWidth: 1,
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardLabel: { fontSize: 12, fontWeight: "bold" },
  cardValue: { fontSize: 24, marginTop: 4, fontWeight: "bold" },

  // Sections
  headerPadding: { paddingHorizontal: 14 },
  sectionContainer: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  seeAllText: { fontSize: 14, fontWeight: "600" },
  horizontalListContent: { gap: 16 },

  testCardContainer: { paddingHorizontal: 14 },
});

export default HomeScreen;
