import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledButton from "@/components/styledButton";
import StylesInput from "@/components/StylesInput";
import { ThemeText } from "@/components/StyledText";
import Colors from "@/constants/Colors";
import { AuthStatus } from "@/@types/authStatus";
import { router } from "expo-router";

type Props = {
  action: (code: string) => Promise<void>;
  error: string | null;
  status: AuthStatus | null;
};

const EntercodeScreen = ({ action, error, status }: Props) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (error) {
      Alert.alert(error);
    }
  }, [error]);
  useEffect(() => {
    console.log(status === AuthStatus.TwoStepRequired);

    if (status === AuthStatus.Success) {
      router.replace("/(app)/home");
    }
  }, [status]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <ThemeText
          style={{
            fontFamily: "RedHatDisplayBB",
            fontWeight: "bold",
            fontSize: 27,
            marginBottom: 10,
            color: "black",
            marginRight: 50,
          }}
        >
          We sent a verification code to your email
        </ThemeText>
        <StylesInput callback={setCode} placeholder="Enter code" />
        <StyledButton
          onPress={async () => {
            await action(code);
          }}
          title="submit"
        />
      </View>
    </SafeAreaView>
  );
};

export default EntercodeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  form: {
    width: "100%",
    gap: 20,
  },
});
