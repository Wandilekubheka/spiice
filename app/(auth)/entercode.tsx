import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

type Props = {
  action: (code: string) => Promise<void>;
  error: string | null;
};

const EntercodeScreen = ({ action, error }: Props) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (error) {
      Alert.alert(error);
    }
  }, [error]);
  return (
    <View>
      <Button
        onPress={async () => {
          await action(code);
        }}
        title="submit"
      />
    </View>
  );
};

export default EntercodeScreen;
