import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

const TabsLayout = () => {
  return (
    <NativeTabs
      backgroundColor="#F8F9FA"
      tintColor="#e4e3e1"
      iconColor={{
        default: "#5F6368",
        selected: "#1a1a1b",
      }}
      labelStyle={{
        default: {
          color: "#5F6368",
          fontSize: 13,
          fontFamily: "Rubik-Medium",
          fontWeight: "400",
        },
        selected: {
          color: "#1a1a1b",
          fontFamily: "Rubik-SemiBold",
          fontSize: 13,
          fontWeight: "600",
        },
      }}
      indicatorColor="#e4e3e1" // Blue indicator (Android only)
      minimizeBehavior="onScrollDown"
      shadowColor="#000000"
      disableTransparentOnScrollEdge={true}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        {Platform.select({
          ios: (
            <Icon
              sf={{
                default: "house",
                selected: "house.fill", // Different icon when selected
              }}
            />
          ),
          android: (
            <Icon src={<VectorIcon family={Ionicons} name="home-outline" />} />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <Label>Explore</Label>
        {Platform.select({
          ios: (
            <Icon
              sf={{
                default: "magnifyingglass",
                selected: "magnifyingglass",
              }}
            />
          ),
          android: (
            <Icon
              src={<VectorIcon family={Ionicons} name="search-outline" />}
            />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        {Platform.select({
          ios: (
            <Icon
              sf={{
                default: "person.crop.circle",
                selected: "person.crop.circle.fill", // Filled version when selected
              }}
            />
          ),
          android: (
            <Icon
              src={<VectorIcon family={Ionicons} name="person-outline" />}
            />
          ),
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabsLayout;
