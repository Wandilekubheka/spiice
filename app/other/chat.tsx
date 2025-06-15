import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import { measure } from "react-native-reanimated";

type Props = {};

const ChatScreen = () => {
  const user = useUserrStore((state) => state.user);
  const [message, setMessage] = useState("");

  const {
    collectionId,
    participants,
  }: { collectionId: string; participants: string } = useLocalSearchParams();
  const { sendMessage, error, messages, fetchMessages } = useMessages();

  useEffect(() => {
    const fetch = async () => {
      if (collectionId && user) {
        await fetchMessages(collectionId);
      }
    };
    fetch();
  }, [collectionId, user]);
  useEffect(() => {
    if (error) {
      console.error("Error creating chat:", error);
      Alert.alert(error);
    }
  }, [error]);

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
      {messages && messages.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            flex: 1,
            textAlignVertical: "center",
          }}
        >
          No messages yet. Start the conversation!
        </Text>
      ) : (
        <View style={styles.chatsContainer}>
          <ChatsDataRender myUserId={user!.uid} messages={messages} />
        </View>
      )}

      <SendMessage
        onSend={async () => {
          await sendMessage(collectionId, user!.uid, message);
          setMessage("");
        }}
        textChange={setMessage}
        value={message}
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
