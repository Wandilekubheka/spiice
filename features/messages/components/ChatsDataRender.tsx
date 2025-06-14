import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Message } from "../@types/messages";

type Props = {
  messages: Message[];
  myUserId: string;
};

const ChatsDataRender = ({ messages, myUserId }: Props) => {
  return (
    <ScrollView>
      {messages.map((message, index) => (
        <View
          key={index}
          style={{
            padding: 10,
            backgroundColor:
              message.senderId === myUserId ? "#CABDFD" : "#9279FE",
            borderRadius: 8,
            borderBottomRightRadius: message.senderId === myUserId ? 0 : 8,
            borderBottomLeftRadius: message.senderId === myUserId ? 8 : 0,
            marginVertical: 5,
            alignSelf:
              message.senderId === myUserId ? "flex-end" : "flex-start",
          }}
        >
          <Text style={{ color: "#333", fontSize: 16 }}>{message.content}</Text>
          <Text style={{ color: "#999", fontSize: 12, marginTop: 5 }}>
            {/* {new Date(message.timestamp).toLocaleTimeString()}/ */}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ChatsDataRender;

const styles = StyleSheet.create({});
