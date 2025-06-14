import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemeText } from "@/components/StyledText";
import { Ionicons } from "@expo/vector-icons";
import { UserModel } from "@/@types/userModel";
import Colors from "@/constants/Colors";

type Props = {
  otherUser: UserModel | undefined;
};

const ChatsHeader = ({ otherUser }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        alignItems: "center",
        gap: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#CABDFD",
      }}
    >
      <Ionicons name="person-circle" size={40} color="#99879D" />
      <ThemeText
        style={{
          fontSize: 25,
          fontFamily: "RedHatDisplayB",
          color: Colors.light.text,
        }}
      >
        {otherUser?.displayName}
      </ThemeText>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 10,
        }}
      >
        <TouchableOpacity>
          <Ionicons name="call" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color={Colors.light.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatsHeader;

const styles = StyleSheet.create({});
