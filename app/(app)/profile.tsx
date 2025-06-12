import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeText } from "@/components/StyledText";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import CustomNavButtons from "@/features/profile/components/CustomNavButtons";

type Props = {};

const ProfileScreen = (props: Props) => {
  const image = null;
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
          <ThemeText style={styles.profileText}>Wandile Kubheka</ThemeText>
          <ThemeText style={styles.profileText}>retroff01@gmail.com</ThemeText>
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
            // handle navigation or action here
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
