import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import icons from "@/constants/icons";

import { showErrorAlert, showSuccessAlert } from "@/components/ui/alert";
import { settings } from "@/constants/data";
import { useColor } from "@/hooks/useColor";
import { FONT_SIZE } from "@/theme/globals";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textColor?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textColor,
  showArrow = true,
}: SettingsItemProp) => {
  const defaultTextColor = useColor("text");
  const finalTextColor = textColor || defaultTextColor;

  return (
    <TouchableOpacity onPress={onPress} style={styles.settingsItemContainer}>
      <View style={styles.settingsItemLeft}>
        <Image source={icon} style={styles.settingsItemIcon} />
        <Text style={[styles.settingsItemText, { color: finalTextColor }]}>
          {title}
        </Text>
      </View>

      {showArrow && (
        <Image source={icons.rightArrow} style={styles.settingsArrowIcon} />
      )}
    </TouchableOpacity>
  );
};

const Profile = () => {
  // const { user, refetch } = useGlobalContext();
  const backgroundColor = useColor("background");
  const textColor = useColor("text");
  const borderColor = useColor("border");
  const destructiveColor = useColor("destructive");

  const handleLogout = async () => {
    const result = true;
    if (result) {
      showSuccessAlert("Success", "Logged out successfully");
      // refetch();
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
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: textColor }]}>
            Profile
          </Text>
          <Image source={icons.bell} style={styles.headerIcon} />
        </View>

        <View style={styles.profileInfoContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editButton}>
              <Image source={icons.edit} style={styles.editIcon} />
            </TouchableOpacity>

            <Text style={[styles.userName, { color: textColor }]}>
              {user?.name}
            </Text>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View
          style={[styles.settingsSection, styles.borderTop, { borderColor }]}
        >
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View
          style={[styles.settingsSection, styles.borderTop, { borderColor }]}
        >
          <SettingsItem
            icon={icons.logout}
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
  headerIcon: {
    width: 20,
    height: 20,
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
  editButton: {
    position: "absolute",
    bottom: 44,
    right: 8,
  },
  editIcon: {
    width: 36,
    height: 36,
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
  settingsItemIcon: {
    width: 24,
    height: 24,
  },
  settingsItemText: {
    fontSize: FONT_SIZE + 1,
    fontFamily: "Rubik-Medium",
  },
  settingsArrowIcon: {
    width: 20,
    height: 20,
  },
});

export default Profile;
