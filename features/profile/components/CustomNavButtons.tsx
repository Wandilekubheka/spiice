import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemeText } from "@/components/StyledText";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type Props = {
  onPress: () => void;
  title: string;
  icon: React.ReactNode;
};

const CustomNavButtons = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        width: "80%",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {props.icon}
        <ThemeText
          style={{
            fontSize: 18,
            fontWeight: "500",
            fontFamily: "RedHatDisplayM",
          }}
        >
          {props.title}
        </ThemeText>
      </View>
      <Ionicons
        name="chevron-forward"
        size={24}
        color={Colors.light.tint}
        style={{ marginLeft: "auto" }}
      />
    </TouchableOpacity>
  );
};

export default CustomNavButtons;

const styles = StyleSheet.create({});
