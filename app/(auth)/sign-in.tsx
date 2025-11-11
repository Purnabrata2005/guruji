import { showErrorAlert, showSuccessAlert } from "@/components/ui/alert";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useColor } from "@/hooks/useColor";
import { FONT_SIZE } from "@/theme/globals";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Auth = () => {
  const backgroundColor = useColor("background");
  const textMuted = useColor("textMuted");
  const textColor = useColor("text");
  const primaryColor = useColor("blue");
  const buttonBgColor = useColor("background");
  const buttonTextColor = useColor("foreground");
  const shadowColor = useColor("ring");

  const handleLogin = async () => {
    const result = true;
    if (result) {
      showSuccessAlert("Success", "Logged in successfully");
    } else {
      showErrorAlert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Image
          source={images.onboarding}
          style={styles.headerImage}
          resizeMode="contain"
        />

        <View style={styles.contentContainer}>
          <Text style={[styles.welcomeText, { color: textMuted }]}>
            Welcome To Shiksha Bandhu
          </Text>

          <Text style={[styles.titleText, { color: textColor }]}>
            Let's Get You Closer To {"\n"}
            <Text style={[styles.titleHighlight, { color: primaryColor }]}>
              Your Ideal Home
            </Text>
          </Text>

          <Text style={[styles.loginPromptText, { color: textMuted }]}>
            Login to Shiksha Bandhu with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            style={[
              styles.googleButton,
              { backgroundColor: buttonBgColor, shadowColor },
            ]}
          >
            <View style={styles.googleButtonInner}>
              <Image
                source={icons.google}
                style={styles.googleIcon}
                resizeMode="contain"
              />
              <Text
                style={[styles.googleButtonText, { color: buttonTextColor }]}
              >
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  headerImage: {
    width: "100%",
    height: "66.66%",
  },
  contentContainer: {
    paddingHorizontal: 40,
  },
  welcomeText: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  titleHighlight: {
    fontSize: 30,
    fontWeight: "bold",
  },
  loginPromptText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 48,
  },
  googleButton: {
    borderRadius: 999,
    width: "100%",
    paddingVertical: 16,
    marginTop: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  googleButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleButtonText: {
    fontSize: FONT_SIZE,
    fontWeight: "500",
  },
});

export default Auth;
