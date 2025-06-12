import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import useUserStats from "@/features/home/hooks/useUserStats";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeText } from "@/components/StyledText";
import ProjectOverview from "@/features/home/components/ProjectOverview";

const HomeScreen = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { error, userData, userProjects } = user?.id
    ? useUserStats(user!.id)
    : { userData: null, error: null, userProjects: [] };
  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/");
    }
  }, [user]);
  useEffect(() => {
    if (error != null) {
      Alert.alert(error);
    }
  }, [error]);
  if (!isLoaded || userData == null || userProjects == null) {
    // Show a loading state while the user data is being fetched
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewPadding}>
          <ThemeText style={styles.feedHeader}>Feed</ThemeText>
          <ThemeText style={styles.subHeader}>Resume</ThemeText>
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/other/detail",
              params: { data: JSON.stringify(userData) },
            })
          }
          style={styles.summaryContainer}
        >
          <ThemeText
            style={{
              fontWeight: "700",
              fontSize: 20,
              fontFamily: "RedHatDisplayB",
              padding: 10,
              color: "#99879D",
            }}
          >
            TOTAL GAIN
          </ThemeText>
          <ThemeText
            style={{
              fontWeight: "700",
              fontSize: 60,
              fontFamily: "RedHatDisplayB",
              padding: 10,
            }}
          >
            {userData.totalGain}K
          </ThemeText>
        </TouchableOpacity>
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
          {userProjects!.length == 0 ? (
            <ThemeText style={styles.noProjectText}>
              No active Projects
            </ThemeText>
          ) : (
            userProjects!.map((item, index) => (
              <ProjectOverview
                key={index}
                title={item.title}
                clientName={item.clientName}
                status={item.status}
              />
            ))
          )}
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
    alignItems: "center",
    justifyContent: "center",
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
  projectsContainer: {
    backgroundColor: "red",
    flex: 1,
    height: "auto",
  },
  noProjectText: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 50,
  },
});
