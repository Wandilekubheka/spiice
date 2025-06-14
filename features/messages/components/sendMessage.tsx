import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type Props = {
  onSend: () => void;
  textChange: (text: string) => void;
};

const SendMessage = (props: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type your message..."
        onChangeText={props.textChange}
        style={styles.input}
      />
      <Ionicons
        name="send"
        size={24}
        color={Colors.light.tint}
        onPress={props.onSend}
      />
    </View>
  );
};

export default SendMessage;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#CABDFD",
    borderRadius: 99,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
});
