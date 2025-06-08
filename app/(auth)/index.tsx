import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import BackgroundView from "@/features/auth/components/backgroundView";
import { onboardingData } from "@/features/auth/data/onboardingData";
import { ThemeText } from "@/components/StyledText";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

const OnboardingScreen = () => {
  const [active, setActive] = useState(3);
  const imagepath: any = onboardingData[active].imageurl;

  return (
    <BackgroundView>
      <Image style={styles.image} source={imagepath} />
      {/* Bottom content */}
      <View style={styles.footerContainer}>
        <ThemeText style={{ textAlign: "center", fontSize: 18 }}>
          {onboardingData[active].desc}
        </ThemeText>
        <TouchableOpacity
          onPress={() => {
            router.replace("/(auth)/login");
          }}
          style={styles.processContainer}
        >
          {onboardingData.map((item, index) => (
            <View
              key={index}
              style={[
                styles.progressItem,
                {
                  backgroundColor:
                    index == active
                      ? Colors.light.tint
                      : Colors.light.tabIconDefault,
                },
              ]}
            />
          ))}
        </TouchableOpacity>
      </View>
    </BackgroundView>
  );
};

export default OnboardingScreen;
const styles = StyleSheet.create({
  image: {
    width: 200,
    aspectRatio: 1,
  },
  footerContainer: {
    width: "70%",
    alignItems: "center",
    gap: 20,
  },
  processContainer: {
    flexDirection: "row",
    gap: 5,
  },
  progressItem: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 99,
  },
});
