import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { images } from "@/assets";

type props = {
  children: ReactNode;
};
const BackgroundView = ({ children }: props) => {
  return (
    <ImageBackground source={images.backgroundImage} style={styles.container}>
      {children}
    </ImageBackground>
  );
};

export default BackgroundView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
