import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  FlatList,
  View,
} from "react-native";
import React, { useEffect, version } from "react";
import { ThemeText } from "@/components/StyledText";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageCard from "@/features/messages/components/MessageCard";
import { router } from "expo-router";
import useMessages from "@/features/messages/hooks/useMessages";
import { useUser } from "@clerk/clerk-expo";
import useUserrStore from "@/store/useUserStore";

const bgColor = "#FAF9FE"; // Default background color
const MessagesScreen = () => {
  const { loading, error, fetchConversations, conversations } = useMessages();
  const user = useUserrStore((state) => state.user);

  useEffect(() => {
    fetchConversations(user.uid);
  }, [user]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching messages:", error);
      Alert.alert(error);
    }
  }, [error]);
  if (loading) {
    return (
      <SafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: bgColor,
        }}
      >
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

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
      <FlatList
        data={conversations}
        ListEmptyComponent={
          <ThemeText style={{ textAlign: "center", marginTop: 20 }}>
            No messages
          </ThemeText>
        }
        renderItem={({ item, index }) => (
          <MessageCard
            onPress={() => {
              router.push({
                pathname: "/other/chat",
                params: {
                  collectionId: item.docID,
                  participants: JSON.stringify(item.value.participants),
                },
              });
            }}
            creator={
              user?.uid === item.value.participantsUid[0]
                ? item.value.participants[1].displayName
                : item.value.participants[0].displayName
            }
            message={item.value.lastMessage}
            creatorAvatarurl={
              user?.uid === item.value.participantsUid[0]
                ? item.value.participants[1].photoURL
                : item.value.participants[0].photoURL
            }
            backgroundColor={index % 2 === 0 ? "#FFFFFF" : bgColor}
          />
        )}
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
