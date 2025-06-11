import { useAuth } from "@clerk/clerk-expo";
import { Slot, Stack, Tabs } from "expo-router";
const AppLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default AppLayout;
