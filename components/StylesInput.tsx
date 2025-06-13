import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
type Props = {
  placeholder: string;
  callback: (text: string) => void;
  secure?: boolean;
};

const StylesInput = (props: Props) => {
  const [hideSecure, setHideSecure] = useState<boolean>(props.secure ?? true);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={props.placeholder}
        onChangeText={(text) => props.callback(text)}
        secureTextEntry={hideSecure && props.secure}
      />
      {props.secure && (
        <TouchableOpacity
          onPress={() => {
            setHideSecure(!hideSecure);
          }}
          style={styles.secureContainer}
        >
          {hideSecure ? (
            <Ionicons name="eye" size={20} />
          ) : (
            <Ionicons name="eye-off-sharp" size={20} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StylesInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBEEFF",
    borderRadius: 10,
    flexDirection: "row",
    height: 50,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  secureContainer: {
    padding: 5,
  },
});
