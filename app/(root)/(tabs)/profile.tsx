import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  GestureResponderEvent,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { showErrorAlert, showSuccessAlert } from "@/components/ui/alert";
import { settings as SETTINGS } from "@/constants/data";
import { useColor } from "@/hooks/useColor";
import { FONT_SIZE } from "@/theme/globals";

/* Types */
type IoniconName = keyof typeof Ionicons.glyphMap;

interface SettingsItemProp {
  icon: IoniconName;
  title: string;
  onPress?: (e?: GestureResponderEvent) => void;
  textColor?: string;
  showArrow?: boolean;
}

/* SettingsItem */
/* memoized for perf */
const SettingsItem = React.memo(function SettingsItem({
  icon,
  title,
  onPress,
  textColor,
  showArrow = true,
}: SettingsItemProp) {
  const defaultTextColor = useColor("text");
  const finalTextColor = textColor || defaultTextColor;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={styles.settingsItemContainer}>
      <View style={styles.settingsItemLeft}>
        <Ionicons name={icon} size={24} color={finalTextColor} />
        <Text style={[styles.settingsItemText, { color: finalTextColor }]}>
          {title}
        </Text>
      </View>

      {showArrow && (
        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color={finalTextColor}
        />
      )}
    </TouchableOpacity>
  );
});

/* RoundIconButton */
/* Reusable circular icon button used for edit camera */
const RoundIconButton = ({
  name,
  size = 20,
  bg,
  fg,
  onPress,
  style,
}: {
  name: IoniconName;
  size?: number;
  bg?: string;
  fg?: string;
  onPress?: () => void;
  style?: any;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.75}
    style={[styles.roundButton, { backgroundColor: bg }, style]}
    accessibilityRole="button"
    accessibilityLabel="Edit avatar">
    <Ionicons name={name} size={size} color={fg} />
  </TouchableOpacity>
);

/* Profile Screen */
const Profile: React.FC = () => {
  const secondaryColor = useColor("secondary");
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const borderColor = useColor("border");
  const destructiveColor = useColor("destructive");

  const handleLogout = async () => {
    const result = true;
    if (result) {
      showSuccessAlert("Success", "Logged out successfully");
    } else {
      showErrorAlert("Error", "Failed to logout");
    }
  };

  const user = {
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: textColor }]}>
            Profile
          </Text>

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={textColor}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfoContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />

            <RoundIconButton
              name="camera-outline"
              size={18}
              bg={secondaryColor}
              fg={textColor}
              style={styles.editButtonPosition}
              onPress={() => {
                /* open edit avatar action */
              }}
            />

            <Text style={[styles.userName, { color: textColor }]}>
              {user?.name}
            </Text>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <SettingsItem icon="calendar-outline" title="My Bookings" />
          <SettingsItem icon="wallet-outline" title="Payments" />
        </View>

        <View
          style={[styles.settingsSection, styles.borderTop, { borderColor }]}>
          {SETTINGS.slice(2).map(item => (
            <SettingsItem
              key={item.title}
              icon={item.icon as IoniconName}
              title={item.title}
            />
          ))}
        </View>

        <View
          style={[styles.settingsSection, styles.borderTop, { borderColor }]}>
          <SettingsItem
            icon="log-out-outline"
            title="Logout"
            textColor={destructiveColor}
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 128,
    paddingHorizontal: 28,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
  },

  profileInfoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  avatarContainer: {
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
  },
  avatar: {
    width: 176,
    height: 176,
    borderRadius: 88,
    position: "relative",
  },

  /* Round icon button */
  roundButton: {
    padding: 10,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  editButtonPosition: {
    position: "absolute",
    bottom: 44,
    right: 8,
  },

  userName: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    marginTop: 8,
  },

  settingsSection: {
    flexDirection: "column",
    marginTop: 40,
  },
  borderTop: {
    borderTopWidth: 1,
    paddingTop: 20,
    marginTop: 20,
  },

  settingsItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingsItemText: {
    fontSize: FONT_SIZE + 1,
    fontFamily: "Rubik-Medium",
  },
});
