import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemeText } from "./StyledText";
import Colors from "@/constants/Colors";

type Props = {
  title: string;
};

const StyledButton = ({ title }: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <ThemeText style={styles.title}>{title}</ThemeText>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    color: "white",
    paddingVertical: 20,
  },
});
