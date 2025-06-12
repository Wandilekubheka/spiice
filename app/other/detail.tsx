import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeText } from "@/components/StyledText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router/build/hooks";
import DetailCard from "@/features/detail/components/detailcard";

type Props = {};

const Detail = (props: Props) => {
  const { data }: { data: string } = useLocalSearchParams();

  useEffect(() => {
    if (data) {
      const parsedData = JSON.parse(data);
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
          Detail
        </ThemeText>
      </TouchableOpacity>
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

const styles = StyleSheet.create({});
