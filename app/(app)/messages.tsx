import { StyleSheet, Text, View } from "react-native";
import React, { version } from "react";
import { ThemeText } from "@/components/StyledText";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageCard from "@/features/messages/components/MessageCard";

type Props = {};

const bgColor = "#FAF9FE"; // Default background color
const MessagesScreen = (props: Props) => {
  const index = 0; // Placeholder for index, can be used for dynamic content later

  return (
    <SafeAreaView style={styles.container}>
      <ThemeText
        style={{
          fontSize: 40,
          fontWeight: "black",
          fontFamily: "RedHatDisplayBB",
          padding: 20,
        }}
      >
        Messages
      </ThemeText>
      <MessageCard
        creator="Wandile Kubheka"
        message="Hey, I am interested in your proposal."
        backgroundColor={index % 2 === 0 ? "#FFFFFF" : bgColor}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
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
