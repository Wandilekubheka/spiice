import { Stack } from "expo-router";

const OtherLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="detail" />
  );
};

export default OtherLayout;
