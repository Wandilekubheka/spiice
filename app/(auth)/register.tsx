import { AuthStatus } from "@/@types/authStatus";
import useRegisterUser from "@/features/auth/hooks/useRegister";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ForgotPassScreen from "./forgotPass";
import EntercodeScreen from "./entercode";
import Colors from "@/constants/Colors";
import { ThemeText } from "@/components/StyledText";
import StyledButton from "@/components/styledButton";
import StylesInput from "@/components/StylesInput";
import { UserModel } from "@/@types/userModel";
import { CreateUserProps } from "@/@types/registerProps";

type Props = {};

function RegisterScreen({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { error, status, onVerifyPress, onSignUpPress } = useRegisterUser();
  useEffect(() => {
    if (error != null) {
      Alert.alert(error);
    }
  }, [error]);

  if (status === AuthStatus.TwoStepRequired) {
    return (
      <EntercodeScreen action={onVerifyPress} status={status} error={error} />
    );
  }

  const registerUser = async () => {
    const userdata: CreateUserProps = {
      name: firstName,
      surname: lastName,
      email: email,
      password: password,
    };
    await onSignUpPress(userdata);
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
          Hello! Register to get started
        </ThemeText>
        <StylesInput placeholder="first name" callback={setFirstName} />
        <StylesInput placeholder="last name" callback={setLastName} />
        <StylesInput placeholder="Email" callback={setEmail} />
        <StylesInput secure placeholder="password" callback={setPassword} />
        <StyledButton onPress={registerUser} title="Register" />
      </View>
      <View style={styles.footer}>
        <ThemeText>Already have an account? </ThemeText>
        <TouchableOpacity
          onPress={() => {
            router.push("/(auth)/login");
          }}
        >
          <ThemeText style={styles.registerText}>Login Now</ThemeText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
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
