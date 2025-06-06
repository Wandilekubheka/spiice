import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Slot } from "expo-router";
const AuthLayout = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(auth)"} />;
  }
  return <Slot />;
};

export default AuthLayout;
