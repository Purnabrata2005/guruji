import { useColor } from "@/hooks/useColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";

const TabsLayout = () => {
  const primaryColor = useColor("primary");
  return (
    <NativeTabs
      backgroundColor="#F8F9FA"
      tintColor="#e4e3e1"
      iconColor={{
        default: "#5F6368",
        selected: primaryColor,
      }}
      labelStyle={{
        default: {
          color: "#5F6368",
          fontSize: 13,
        },
        selected: {
          color: primaryColor,
          fontSize: 13,
        },
      }}
      indicatorColor="#e4e3e1"
      minimizeBehavior="onScrollDown"
      shadowColor="#000000"
      disableTransparentOnScrollEdge={true}>
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
          android: <Icon src={<VectorIcon family={Ionicons} name="home" />} />,
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
            <Icon src={<VectorIcon family={Ionicons} name="search" />} />
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
            <Icon src={<VectorIcon family={Ionicons} name="person" />} />
          ),
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabsLayout;
