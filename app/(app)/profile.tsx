import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeText } from "@/components/StyledText";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import CustomNavButtons from "@/features/profile/components/CustomNavButtons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import useUserrStore from "@/store/useUserStore";

const ProfileScreen = () => {
  const { signOut, isLoaded, isSignedIn } = useAuth();
  const userContext = useUserrStore((state) => state);
  const image = userContext?.user?.photoURL || null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topOverview}>
        <ThemeText
          style={{
            fontSize: 32,

            fontWeight: "black",
            fontFamily: "RedHatDisplayBB",
          }}
        >
          Profile
        </ThemeText>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 60, height: 60, borderRadius: 20 }}
          />
        ) : (
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 99,
              backgroundColor: Colors.light.tint,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="person" size={50} color="#FFFFFF" />
          </View>
        )}
        <View style={{ alignItems: "center", gap: 5 }}>
          <ThemeText style={styles.profileText}>
            {userContext.user?.displayName}
          </ThemeText>
          <ThemeText style={styles.profileText}>
            {userContext.user?.email}
          </ThemeText>
        </View>
      </View>
      <View>
        <CustomNavButtons
          onPress={() => {
            // handle navigation or action here
          }}
          title="Edit Profile"
          icon={
            <Ionicons
              name="create-outline"
              size={24}
              color={Colors.light.tint}
            />
          }
        />
        <CustomNavButtons
          onPress={() => {
            // handle navigation or action here
          }}
          title="Privacy Policy"
          icon={
            <Ionicons name="lock-closed" size={24} color={Colors.light.tint} />
          }
        />
        <CustomNavButtons
          onPress={() => {
            // handle navigation or action here
          }}
          title="Settings"
          icon={
            <Ionicons name="settings" size={24} color={Colors.light.tint} />
          }
        />
        <CustomNavButtons
          onPress={() => {
            if (isLoaded && isSignedIn && userContext.user) {
              signOut()
                .then(() => {
                  userContext.clearUser();
                })
                .catch((error) => {
                  console.error("Sign out error:", error);
                });
            } else {
              Alert.alert(
                "that's weird",
                "You are not signed in... Please contact support if you think this is a mistake."
              );
            }
          }}
          title="Sign out"
          icon={<Ionicons name="log-out" size={24} color={Colors.light.tint} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",

    backgroundColor: "#FAF9FE",
    gap: 20,
    alignItems: "center",
  },
  topOverview: {
    alignItems: "center",
    gap: 40,
  },
  profileText: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "RedHatDisplayR",
    color: "#99879D",
  },
});
