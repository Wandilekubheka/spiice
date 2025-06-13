import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { images } from "@/assets";
import { ThemeText } from "@/components/StyledText";

type props = {
  children: ReactNode;
};
const BackgroundView = ({ children }: props) => {
  return (
    <ImageBackground source={images.backgroundImage} style={styles.container}>
      <ThemeText style={{ fontFamily: "RedHatDisplayM", fontSize: 32 }}>
        Spiice
      </ThemeText>
      {children}
    </ImageBackground>
  );
};

export default BackgroundView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
});
