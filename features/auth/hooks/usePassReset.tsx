import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { AuthStatus } from "@/@types/authStatus";

const usePassReset = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [status, setStatus] = useState<AuthStatus | null>(null);
  const [error, setError] = useState("");

  // Send the password reset code to the user's email
  const sendPassReset = async (email: string) => {
    if (!isLoaded) return;
    await signIn
      .create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setStatus(AuthStatus.TwoStepRequired);
        setError("");
      })
      .catch((err) => {
        setError(err.errors[0].longMessage);
      });
  };

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  const updatePassword = async (code: string, password: string) => {
    if (!isLoaded) return;

    await signIn
      .attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          setError("");
        } else if (result.status === "complete") {
          setStatus(AuthStatus.Success);
        } else {
          setStatus(AuthStatus.Error);
          console.log(result);
        }
      })
      .catch((err) => {
        setStatus(AuthStatus.Error);
        setError(err.errors[0].longMessage);
      });
  };
  return { updatePassword, sendPassReset, error, status };
};

export default usePassReset;
