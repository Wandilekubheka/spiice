import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemeText } from "./StyledText";
import Colors from "@/constants/Colors";

type Props = {
  title: string;
  onPress: () => void;
};

const StyledButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ThemeText style={styles.title}>{title}</ThemeText>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    borderRadius: 99,
    alignItems: "center",
  },
  title: {
    color: "white",
    paddingVertical: 20,
  },
});
