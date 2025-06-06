import { AuthStatus } from "@/@types/authStatus";
import { UserModel } from "@/@types/userModel";
import { useAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import {
  addUserToDatabase,
  getUserFromDatabase,
} from "../service/auth_service";

type Props = {
  userdata: UserModel;
  password: string;
};

const useRegisterUser = ({ userdata, password }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<AuthStatus | null>(null);
  const [user, setUser] = useState<null | UserModel>(null);
  const [pendingVerification, setPendingVerification] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();

  const [error, setError] = useState<null | string>(null);

  //   useEffect(() => {
  //     onSignInPress()
  //       .then(() => {
  //         if (status == null) setStatus(AuthStatus.Success);
  //       })
  //       .catch((error: string) => {
  //         setError(error);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }, []);
  // Handle submission of sign-up form

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        username: userdata.email,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setError(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async (code: string) => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.id) {
        if (signUpAttempt.status === "complete") {
          await setActive({ session: signUpAttempt.createdSessionId });
          await addUserToDatabase(userdata);
        } else {
          // If the status is not complete, check why. User may need to
          // complete further steps.
          console.error(JSON.stringify(signUpAttempt, null, 2));
        }
      } else {
        setError("im here");
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return { error, isLoading, status, onVerifyPress, onSignUpPress };
};

export default useRegisterUser;
