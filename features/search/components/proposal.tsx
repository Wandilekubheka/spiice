import {
  Image,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ThemeText } from "@/components/StyledText";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { jobCard } from "../@types/jobCard";
import { router } from "expo-router";

const Proposal = (props: jobCard) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/other/sendProposal",
          params: { data: JSON.stringify({ proposal: props }) },
        });
      }}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        {props.creatorAvatarurl ? (
          <Image
            source={{ uri: props.creatorAvatarurl }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        ) : (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#99879D",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="person" size={24} color="#FFFFFF" />
          </View>
        )}
        <ThemeText
          style={{
            fontSize: 20,
          }}
        >
          {props.creator}
        </ThemeText>
      </View>
      <View style={styles.contentContainer}>
        <ThemeText style={{ fontSize: 12, color: "#99879D" }}>
          Posted on {props.postedDate.toString()}
        </ThemeText>
        <ThemeText style={styles.jobTitle}>{props.title}</ThemeText>
        <ThemeText style={{ fontSize: 16, color: "#99879D" }}>
          {props.description}
        </ThemeText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ThemeText style={{ fontSize: 12, color: "#99879D" }}>
            {props.offerCount} propositions
          </ThemeText>
          <ThemeText style={{ fontSize: 16, color: Colors.light.tint }}>
            ${props.budget}
          </ThemeText>
        </View>
        <FlatList
          data={props.skills}
          contentContainerStyle={{ gap: 5 }}
          renderItem={({ item }) => (
            <ThemeText style={styles.skills}>{item}</ThemeText>
          )}
          keyExtractor={(item) => item}
          horizontal
        />
      </View>
    </TouchableOpacity>
  );
};

export default Proposal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  headerContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 24,
    marginBottom: 10,
    backgroundColor: "#EFEDF0",
  },
  contentContainer: {
    padding: 16,
    gap: 10,
  },
  jobTitle: {
    fontSize: 25,
    fontFamily: "RedHatDisplayB",

    color: "#000000",
    marginBottom: 10,
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
