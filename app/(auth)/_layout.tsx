import { useAuth } from "@clerk/clerk-expo";
import { Redirect, router, Slot } from "expo-router";
import { useEffect } from "react";
const AuthLayout = () => {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(app)/home");
    }
  }, [isSignedIn]);

  return <Slot />;
};

export default AuthLayout;
