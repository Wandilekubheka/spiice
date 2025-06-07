import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useLoginUser from "@/features/auth/hooks/useLoginUser";
import { AuthStatus } from "@/@types/authStatus";
import { router } from "expo-router";
import BackgroundView from "@/features/auth/components/backgroundView";
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
    <BackgroundView>
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
      <Button
        title="register"
        onPress={() => {
          router.push("/(auth)/register");
        }}
      />
      <Button
        title="forgotpass"
        onPress={() => {
          router.push("/(auth)/forgotPass");
        }}
      />
    </BackgroundView>
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
