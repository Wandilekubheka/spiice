import { View, Text, Alert, TextInput, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import usePassReset from "@/features/auth/hooks/usePassReset";
import { AuthStatus } from "@/@types/authStatus";
import { router } from "expo-router";
import StylesInput from "@/components/StylesInput";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledButton from "@/components/styledButton";
import { ThemeText } from "@/components/StyledText";

const ForgotPassScreen = () => {
  const { error, sendPassReset, updatePassword, status } = usePassReset();
  const [code, setCode] = useState("");
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (status === AuthStatus.Error) {
      Alert.alert(error);
    } else if (status === AuthStatus.Success) {
      console.log(status);

      Alert.alert("password reset successfully");
      // move you back to login screen
      router.replace("/(auth)");
    } else if (status === AuthStatus.TwoStepRequired) {
      setShowCodeModal(true);
    }
  }, [status]);
  if (showCodeModal) {
    return (
      <SafeAreaView style={styles.container}>
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
          we sen't a reset code to {email}
        </ThemeText>
        <StylesInput placeholder="Code" callback={setCode} />

        <StyledButton
          title="submit"
          onPress={async () => {
            await updatePassword(code, password);
          }}
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
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
        Let's quickly help you reset your email.
      </ThemeText>
      <StylesInput placeholder="Email" callback={setEmail} />
      <StylesInput placeholder="new password" callback={setPassword} />
      <StyledButton
        onPress={async () => {
          sendPassReset(email);
        }}
        title="submit"
      />
    </SafeAreaView>
  );
};

export default ForgotPassScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 20,
  },
  form: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
  },
  forgotPass: {
    alignSelf: "flex-end",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: Colors.light.tint,
  },
});
