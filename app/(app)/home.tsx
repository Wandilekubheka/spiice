import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import useUserStats from "@/features/home/hooks/useUserStats";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeText } from "@/components/StyledText";
import Colors from "@/constants/Colors";
import ProjectOverview from "@/features/home/components/ProjectOverview";
import { ProjectStatus } from "@/features/@types/ProjectStatus";

const HomeScreen = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { error, userData } = user?.id
    ? useUserStats(user!.id)
    : { userData: null, error: null };
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/");
    }
  }, [user]);
  // useEffect(() => {
  //   if (error) {
  //     Alert.alert(error);
  //   }
  // }, [error]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewPadding}>
          <ThemeText style={styles.feedHeader}>Feed</ThemeText>
          <ThemeText style={styles.subHeader}>Resume</ThemeText>
        </View>

        <View style={styles.summaryContainer}></View>
        <View style={styles.viewPadding}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ThemeText style={styles.subHeader}>Active projects</ThemeText>
            <TouchableOpacity>
              <ThemeText style={styles.viewAllButton}>
                Active projects
              </ThemeText>
            </TouchableOpacity>
          </View>
          <ProjectOverview
            title={"Wireframes"}
            clientName={"Francisco Fisher"}
            status={ProjectStatus.active}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9FE",
    gap: 10,
  },
  feedHeader: {
    fontWeight: "800",
    fontSize: 40,
    fontFamily: "RedHatDisplayBB",
  },
  subHeader: {
    fontWeight: "700",
    fontSize: 25,
    fontFamily: "RedHatDisplayB",
  },
  summaryContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "white",
  },
  viewAllButton: {
    backgroundColor: "#FBEAFF",
    padding: 7,
    borderRadius: 5,
    fontWeight: "500",
    fontFamily: "PublicSansM",
  },
  viewPadding: {
    padding: 10,
  },
});
