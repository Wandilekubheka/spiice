import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeText } from "@/components/StyledText";
import { Ionicons } from "@expo/vector-icons";
import Proposal from "@/features/search/components/proposal";

type Props = {};

const SearchScreen = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ThemeText
        style={{
          fontSize: 40,
          fontWeight: "black",
          fontFamily: "RedHatDisplayBB",
        }}
      >
        Search
      </ThemeText>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="search" />
        {/* // add a search event handler */}
        <Ionicons name="search" size={24} color="#99879D" />
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          gap: 10,
        }}
      >
        <Ionicons name="filter" size={24} color="#99879D" />
        <ThemeText
          style={{ fontSize: 16, fontWeight: "500", color: "#99879D" }}
        >
          Filters
        </ThemeText>
      </TouchableOpacity>
      <Proposal
        title="React Native Developer"
        description="Looking for a React Native developer to build a mobile app."
        postedDate="2023-10-01"
        offerCount={5}
        budget={1000}
        skills={["React Native", "JavaScript", "TypeScript"]}
        creator={"Wandile Kubheka"}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9FE",
    padding: 20,
    gap: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#99879D",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 5,
  },
  searchInput: {
    flex: 1,
  },
});
