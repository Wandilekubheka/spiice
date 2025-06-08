import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useLoginUser from "@/features/auth/hooks/useLoginUser";
import { AuthStatus } from "@/@types/authStatus";
import { router } from "expo-router";
import { ThemeText } from "@/components/StyledText";
import StylesInput from "@/components/StylesInput";
import Colors from "@/constants/Colors";
import StyledButton from "@/components/styledButton";
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
          Welcome back! Glad to see you again!
        </ThemeText>
        <StylesInput
          callback={(text) => setEmail(text)}
          placeholder="Enter your email"
        />
        <StylesInput
          callback={(text) => setPassword(text)}
          placeholder="Enter your password"
          secure
        />
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/forgotPass");
          }}
          style={styles.forgotPass}
        >
          <ThemeText>Forgot Password?</ThemeText>
        </TouchableOpacity>
        <StyledButton onPress={loginUser} title="LOGIN" />
      </View>
      <View style={styles.footer}>
        <ThemeText>Don't have an account? </ThemeText>
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/register");
          }}
        >
          <ThemeText style={styles.registerText}>Register Now</ThemeText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
