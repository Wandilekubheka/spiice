import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type Props = {
  backgroundColor: string;
  creatorAvatarurl?: string;
  creator: string;
  message: string;
};

const MessageCard = (props: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: props.backgroundColor }]}
    >
      <View style={styles.leftContent}>
        {props.creatorAvatarurl ? (
          <Image
            source={{ uri: props.creatorAvatarurl }}
            style={{ width: 60, height: 60, borderRadius: 20 }}
          />
        ) : (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 99,
              backgroundColor: Colors.light.tint,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="person" size={24} color="#FFFFFF" />
          </View>
        )}
        <View style={{ marginLeft: 10, gap: 5 }}>
          <Text style={styles.nameText}>{props.creator}</Text>
          <Text style={styles.messageText}>{props.message}</Text>
        </View>
      </View>
      <Ionicons
        name="chevron-forward"
        size={24}
        color="#99879D"
        style={{ alignSelf: "center" }}
      />
    </TouchableOpacity>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: "row",
  },
  leftContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  nameText: {
    fontSize: 20,
    fontFamily: "RedHatDisplayB",
    color: "#000000",
  },
  messageText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "RedHatDisplayR",
    color: "#99879D",
  },
});
