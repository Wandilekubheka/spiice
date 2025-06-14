import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeText } from "@/components/StyledText";
import useMessages from "@/features/messages/hooks/useMessages";
import { UserModel } from "@/@types/userModel";
import useUserrStore from "@/store/useUserStore";
import Colors from "@/constants/Colors";
import ChatsHeader from "@/features/messages/components/ChatsHeader";
import SendMessage from "@/features/messages/components/sendMessage";
import { Message } from "@/features/messages/@types/messages";
import ChatsDataRender from "@/features/messages/components/ChatsDataRender";

type Props = {};

const ChatScreen = () => {
  const user = useUserrStore((state) => state.user);
  const {
    collectionId,
    participants,
  }: { collectionId: string; participants: string } = useLocalSearchParams();
  console.log(participants);

  // const { messages, fetchMessages } = useMessages();
  // useEffect(() => {
  //   if (collectionId) {
  //     fetchMessages(collectionId);
  //   }
  // }, [collectionId]);
  const dummyMessages: Message[] = [
    {
      conversationId: "chat_001",
      senderId: "user_2yJfJjLBcmu9ib1Dg433fY9oFYh",
      content: "Hey! How are you doing?",
      timestamp: new Date("2025-06-14T08:30:00Z"),
      isRead: true,
    },
    {
      conversationId: "chat_001",
      senderId: "user_2yRyOpzjhjh3sahlEzMZK6D5Lp1",
      content: "I'm good, thanks! What about you?",
      timestamp: new Date("2025-06-14T08:31:30Z"),
      isRead: true,
    },
    {
      conversationId: "chat_001",
      senderId: "user_2yJfJjLBcmu9ib1Dg433fY9oFYh",
      content: "I'm doing great! Working on a new project.",
      timestamp: new Date("2025-06-14T08:33:00Z"),
      isRead: true,
    },
    {
      conversationId: "chat_001",
      senderId: "user_2yRyOpzjhjh3sahlEzMZK6D5Lp1",
      content: "Nice! What's it about?",
      timestamp: new Date("2025-06-14T08:34:15Z"),
      isRead: false,
    },
    {
      conversationId: "chat_001",
      senderId: "user_2yJfJjLBcmu9ib1Dg433fY9oFYh",
      content: "It's a chat app, actually 😄",
      timestamp: new Date("2025-06-14T08:35:45Z"),
      isRead: false,
    },
  ];
  // if for some reason other users returns more that 1 user
  const otherUser: UserModel = JSON.parse(participants).filter(
    (participant: UserModel) => participant.uid !== user?.uid
  )[0];
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
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
      <ChatsHeader otherUser={otherUser} />
      <View style={styles.chatsContainer}>
        <ChatsDataRender myUserId={user!.uid} messages={dummyMessages} />
      </View>
      <SendMessage
        onSend={function (): void {
          throw new Error("Function not implemented.");
        }}
        textChange={function (text: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  chatsContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.light.background,
  },
});
