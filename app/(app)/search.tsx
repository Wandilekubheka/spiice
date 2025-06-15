import {
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeText } from "@/components/StyledText";
import { Ionicons } from "@expo/vector-icons";
import Proposal from "@/features/search/components/proposal";
import useSearch from "@/features/search/hooks/useSearch";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

type Props = {};

const SearchScreen = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { error, searchResults, searchUserByName } = useSearch();

  useEffect(() => {
    if (error) {
      console.error("Search error:", error);
      Alert.alert(error);
    }
  }, [error]);

  const handleSearch = async (query: string) => {
    try {
      searchUserByName(query);
    } catch (error: any) {
      console.error("Error during search:", error);
      Alert.alert(error);
    }
  };

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
        <TextInput
          style={styles.searchInput}
          placeholder="search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={() => handleSearch(searchQuery)}
          style={{ padding: 10 }}
        >
          <Ionicons name="search" size={24} color="#99879D" />
        </TouchableOpacity>
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchResults}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <Proposal {...item} />}
        ListEmptyComponent={
          <ThemeText style={{ textAlign: "center", marginTop: 20 }}>
            No results found
          </ThemeText>
        }
      />
      <TouchableOpacity
        onPress={() => {
          router.push("/other/MakeProposal");
        }}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: Colors.light.tint,
          borderRadius: 20,
          padding: 20,
        }}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
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
