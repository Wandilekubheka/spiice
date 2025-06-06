import { AuthStatus } from "@/@types/authStatus";
import { UserModel } from "@/@types/userModel";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { getUserFromDatabase } from "../service/auth_service";

type Props = {
  email: string;
  password: string;
};

const useLoginUser = ({ email, password }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<AuthStatus | null>(null);
  const { signIn, setActive, isLoaded } = useSignIn();
  const [error, setError] = useState<null | string>(null);
  const [user, setUser] = useState<null | UserModel>(null);

  useEffect(() => {
    onSignInPress()
      .then(() => {
        if (status == null) setStatus(AuthStatus.Success);
      })
      .catch((error: string) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.id) {
        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          const _user = await getUserFromDatabase(signInAttempt.id);
          setUser(_user);
        } else {
          // If the status isn't complete, check why. User might need to
          // complete further steps.
          setError("An unknown error occured");
          setStatus(AuthStatus.Error);
        }
      } else {
        setError("failed to get user from database");
        setStatus(AuthStatus.Error);
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      const errorMessage = JSON.stringify(err, null, 2);
      setError(errorMessage);
    }
  };
  return { error, isLoading, status };
};

export default useLoginUser;
