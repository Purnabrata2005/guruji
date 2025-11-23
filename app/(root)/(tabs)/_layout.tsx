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

      <NativeTabs.Trigger name="challenge">
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
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { Tabs } from "expo-router";
// import { Platform } from "react-native";

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: "#007bff", // active color
//         tabBarInactiveTintColor: "#5F6368", // inactive color
//         tabBarStyle: {
//           backgroundColor: "#F8F9FA",
//           borderTopColor: "#e4e3e1",
//         },
//       }}>
//       {/* HOME */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, focused }) =>
//             Platform.OS === "ios" ? (
//               <Ionicons
//                 name={focused ? "home" : "home-outline"}
//                 size={24}
//                 color={color}
//               />
//             ) : (
//               <Ionicons name="home-outline" size={24} color={color} />
//             ),
//         }}
//       />

//       {/* EXPLORE */}
//       <Tabs.Screen
//         name="challenge"
//         options={{
//           title: "Explore",
//           tabBarIcon: ({ color }) =>
//             Platform.OS === "ios" ? (
//               <Ionicons name="search" size={24} color={color} />
//             ) : (
//               <Ionicons name="search" size={24} color={color} />
//             ),
//         }}
//       />

//       {/* PROFILE */}
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color, focused }) =>
//             Platform.OS === "ios" ? (
//               <Ionicons
//                 name={focused ? "person" : "person-outline"}
//                 size={24}
//                 color={color}
//               />
//             ) : (
//               <Ionicons name="person-outline" size={24} color={color} />
//             ),
//         }}
//       />
//     </Tabs>
//   );
// }
