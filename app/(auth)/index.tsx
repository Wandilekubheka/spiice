import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useLoginUser from "@/features/auth/hooks/useLoginUser";
import { AuthStatus } from "@/@types/authStatus";
import { router } from "expo-router";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, status, onSignInPress } = useLoginUser();
  useEffect(() => {
    if (status === AuthStatus.Success) {
      router.replace("/");
    }
  }, [status]);

  useEffect(() => {
    if (error) {
      Alert.alert("Login Failed", error);
    }
  }, [error]);
  const loginUser = async () => {
    await onSignInPress({ email, password });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="login"
        onPress={() => {
          loginUser();
        }}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
