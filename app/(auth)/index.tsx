import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackgroundView from "@/features/auth/components/backgroundView";

type Props = {};

const OnboardingScreen = (props: Props) => {
  return (
    <BackgroundView>
      <Text>OnboardingScreen</Text>
    </BackgroundView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
