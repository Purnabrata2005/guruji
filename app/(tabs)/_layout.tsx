import CustomTabBar from "@/components/navigation/CustomTabBar";
import { StyledTabs } from "@/components/navigation/tabs";
import { useColor } from "@/hooks/useColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabsLayout = () => {
  // Get safe area insets
  const insets = useSafeAreaInsets();
  const backgroundColor = useColor("background");
  const borderColor = useColor("border");
  const textColor = useColor("text");

  return (
    <StyledTabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: backgroundColor,
          borderBottomColor: borderColor,
          borderBottomWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontFamily: "Rubik-Bold",
          color: textColor,
        },
      }}>
      {/* Home Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="challenge"
        options={{
          title: "Challenges",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="problems"
        options={{
          title: "Problems",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="code-slash-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </StyledTabs>
  );
};

export default TabsLayout;
