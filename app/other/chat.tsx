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

type Props = {};

const ChatScreen = () => {
  const user = useUserrStore((state) => state.user);
  const {
    collectionId,
    participants,
  }: { collectionId: string; participants: string } = useLocalSearchParams();
  const { messages, fetchMessages } = useMessages();
  useEffect(() => {
    if (collectionId) {
      fetchMessages(collectionId);
    }
  }, [collectionId]);
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
        <Text>Chat messages will appear here</Text>
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
