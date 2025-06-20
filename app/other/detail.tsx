import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeText } from "@/components/StyledText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router/build/hooks";
import DetailCard from "@/features/detail/components/detailcard";

const Detail = () => {
  const { data }: { data: string } = useLocalSearchParams();
  const parsedData = JSON.parse(data);

  useEffect(() => {
    if (data) {
    }
  }, [data]);
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
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
      <ThemeText style={styles.titleText}>Details</ThemeText>
      <DetailCard
        title="Total Gains"
        amount={30}
        summary={{
          quantity: [10],
          date: ["2023-10-01"],
        }}
      />
      <DetailCard
        title="Total Projects"
        amount={30}
        summary={{
          quantity: [10],
          date: ["2023-10-01"],
        }}
      />
      <DetailCard
        title="Total Requests"
        amount={30}
        summary={{
          quantity: [10],
          date: ["2023-10-01"],
        }}
      />
      <DetailCard
        title="Total Reviews"
        amount={30}
        summary={{
          quantity: [10],
          date: ["2023-10-01"],
        }}
      />
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "RedHatDisplayB",
    padding: 15,
    color: "#99879D",
  },
});
