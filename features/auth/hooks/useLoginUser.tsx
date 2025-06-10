import { AuthStatus } from "@/@types/authStatus";
import { UserModel } from "@/@types/userModel";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { getUserFromDatabase } from "../service/auth_service";

type Props = {
  email: string;
  password: string;
};

const useLoginUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<AuthStatus | null>(
    AuthStatus.unVerified
  );
  const { signIn, setActive, isLoaded } = useSignIn();
  const [error, setError] = useState<null | string>(null);
  const [user, setUser] = useState<null | UserModel>(null);

  const onSignInPress = async ({ email, password }: Props) => {
    if (!isLoaded) return;
    //reset values
    setIsLoading(true);
    setError(null);
    setStatus(null);
    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password: password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (
        signInAttempt.status === "complete" &&
        signInAttempt.id != undefined
      ) {
        await setActive({ session: signInAttempt.createdSessionId });
        const _user = await getUserFromDatabase(signInAttempt.id);
        if (_user == null) {
          setError("User not found in database");
          setStatus(AuthStatus.Error);
          return;
        }
        setUser(_user);
        setStatus(AuthStatus.Success);
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        setError("An unknown error occured");
        setStatus(AuthStatus.Error);
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      const errorMessage = err?.errors?.[0]?.longMessage || "Unexpected error";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return { error, isLoading, status, onSignInPress, user };
};

export default useLoginUser;
