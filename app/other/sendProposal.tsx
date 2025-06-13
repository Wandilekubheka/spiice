import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { jobCard } from "@/features/search/@types/jobCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Route } from "expo-router/build/Route";
import { useLocalSearchParams } from "expo-router/build/hooks";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ThemeText } from "@/components/StyledText";
import StyledButton from "@/components/styledButton";
import { router } from "expo-router";

const SendProposal = () => {
  const { data }: { data: string } = useLocalSearchParams();
  const proposal = JSON.parse(data).proposal as jobCard;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#99879D" />
        <ThemeText
          style={{
            fontSize: 20,
            fontWeight: "500",
            marginLeft: 10,
            fontFamily: "RedHatDisplayM",
            color: "#99879D",
          }}
        >
          Back
        </ThemeText>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            {proposal.creatorAvatarurl ? (
              <Image
                source={{ uri: proposal.creatorAvatarurl }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color="#FFFFFF" />
              </View>
            )}
            <ThemeText style={styles.jobTitle}>{proposal.creator}</ThemeText>
          </View>
          <ThemeText style={{ fontSize: 12, color: "#99879D" }}>
            Posted on {proposal.postedDate.toString()}
          </ThemeText>
          <ThemeText style={styles.jobTitle}>{proposal.title}</ThemeText>
          <ThemeText style={{ fontSize: 16, color: "#99879D" }}>
            {proposal.description}
          </ThemeText>
          <View style={styles.priceContainer}>
            <ThemeText
              style={{
                fontSize: 12,
                color: "#99879D",
              }}
            >
              {proposal.offerCount} proposals
            </ThemeText>

            <ThemeText
              style={{
                fontSize: 16,
                color: Colors.light.tint,
                fontFamily: "PublicSansM",
              }}
            >
              R{proposal.budget}
            </ThemeText>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            gap: 5,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {proposal.skills &&
            proposal.skills.length > 0 &&
            proposal.skills.map((skill, index) => (
              <ThemeText key={index} style={styles.skills}>
                {skill}
              </ThemeText>
            ))}
        </View>
      </ScrollView>

      <View style={{ marginVertical: 10 }}>
        <StyledButton onPress={() => {}} title="Make a proposition" />
      </View>
    </SafeAreaView>
  );
};

export default SendProposal;
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contentContainer: {
    marginTop: 10,
    gap: 10,
  },
  jobTitle: {
    fontSize: 25,
    color: Colors.light.text,
    fontFamily: "RedHatDisplayBB",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 99,
    backgroundColor: Colors.light.tint,
    justifyContent: "center",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  skills: {
    fontSize: 12,
    color: "#99879D",
    fontFamily: "RedHatDisplayM",
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
    textTransform: "uppercase",
    borderWidth: StyleSheet.hairlineWidth,
  },
});
