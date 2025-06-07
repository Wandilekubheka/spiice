import { View, Text, Alert, TextInput, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import usePassReset from "@/features/auth/hooks/usePassReset";
import { AuthStatus } from "@/@types/authStatus";
import { router } from "expo-router";

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
      Alert.alert("password reset successfully");
      // move you back to login screen
      router.replace("/(auth)");
    } else if (status === AuthStatus.TwoStepRequired) {
      setShowCodeModal(true);
    }
  }, [status]);
  if (showCodeModal) {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Code" value={code} onChangeText={setCode} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <Button
          title="submit"
          onPress={async () => {
            await updatePassword(code, password);
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button
        title="submit"
        onPress={async () => {
          await sendPassReset(email);
        }}
      />
    </View>
  );
};

export default ForgotPassScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
