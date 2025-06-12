import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { DetailCardData } from "../@types/detailstype";
import { ThemeText } from "@/components/StyledText";
import { Ionicons } from "@expo/vector-icons";

const DetailCard = ({ title, amount, summary }: DetailCardData) => {
  const [toggled, setToggled] = useState(false);
  const { quantity, date } = summary;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setToggled(!toggled)}
        style={styles.content}
      >
        <ThemeText>{title}</ThemeText>
        <View>
          <ThemeText>{amount}</ThemeText>
          <Ionicons
            name={toggled ? "chevron-up" : "chevron-down"}
            size={20}
            color={"#99879D"}
          />
        </View>
        {toggled && (
          <View>
            <ThemeText>Quantity: {quantity[0]}</ThemeText>
            <ThemeText>Date: {date[0]}</ThemeText>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DetailCard;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  container: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderWidth: 1,
    borderColor: "#99879D",
  },
});
