import Colors from "@/constants/Colors";
import { Text, TextProps } from "react-native";

export function ThemeText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "PublicSansM", color: Colors.light.text },
        props.style,
      ]}
    />
  );
}
