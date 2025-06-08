import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Slot } from "expo-router";
const AuthLayout = () => {
  const { isSignedIn } = useAuth();

  const isUser = true;

  if (isSignedIn && isUser) {
    return <Redirect href={"/(app)/home"} />;
  }
  return <Slot />;
};

export default AuthLayout;
