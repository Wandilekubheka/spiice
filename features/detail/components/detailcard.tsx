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
        <ThemeText style={styles.titleText}>{title}</ThemeText>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <ThemeText style={styles.amountText}>{amount}</ThemeText>
          <Ionicons
            name={toggled ? "chevron-up" : "chevron-down"}
            size={20}
            color={"#99879D"}
          />
        </View>
      </TouchableOpacity>
      {toggled && (
        <View>
          <ThemeText>Quantity: {quantity[0]}</ThemeText>
          <ThemeText>Date: {date[0]}</ThemeText>
        </View>
      )}
    </View>
  );
};

export default DetailCard;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  container: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#99879D",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "RedHatDisplayM",
  },
  amountText: {
    fontSize: 40,
    fontWeight: "700",
    fontFamily: "RedHatDisplayB",
    color: "#000000",
  },
});
