import { AuthStatus } from "@/@types/authStatus";
import { View, Text } from "@/components/Themed";
import useRegisterUser from "@/features/auth/hooks/useRegister";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ForgotPassScreen from "./forgotPass";
import EntercodeScreen from "./entercode";

type Props = {};

function RegisterScreen({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { error, status, onVerifyPress, pendingVerification } =
    useRegisterUser();
  useEffect(() => {
    if (error != null) {
      Alert.alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (status === AuthStatus.Success) {
      router.replace("/(app)/home");
    }
  }, [status]);

  if (pendingVerification) {
    return <EntercodeScreen action={onVerifyPress} error={error} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="first name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
      />
    </SafeAreaView>
  );
}

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
