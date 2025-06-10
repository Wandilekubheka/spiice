import { AuthStatus } from "@/@types/authStatus";
import { UserModel } from "@/@types/userModel";
import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { addUserToDatabase } from "../service/auth_service";
import { formValidator } from "@/utils/formValidator";
import { CreateUserProps } from "@/@types/registerProps";
type Props = {
  userdata: UserModel;
  password: string;
};

const useRegisterUser = () => {
  const [status, setStatus] = useState<AuthStatus | null>(null);
  const [userdata, setUserData] = useState<CreateUserProps | null>(null);

  const { isLoaded, signUp, setActive } = useSignUp();

  const [error, setError] = useState<null | string>(null);

  const onSignUpPress = async (props: CreateUserProps) => {
    const formErrors = formValidator(props);

    if (formErrors != null) {
      setError(formErrors);
      setStatus(AuthStatus.Error);
      return;
    }

    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: props.email,
        password: props.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setError(null);
      setUserData(props);
      setStatus(AuthStatus.TwoStepRequired);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      const errorMessage = err?.errors?.[0]?.longMessage || "Unexpected error";
      setError(errorMessage);
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

      if (signUpAttempt.id && userdata) {
        if (signUpAttempt.status === "complete") {
          await setActive({ session: signUpAttempt.createdSessionId });
          const user: UserModel = {
            uid: signUpAttempt.createdUserId!,
            email: signUpAttempt.emailAddress!,
            createdAt: new Date(),
            displayName: `${userdata.name} ${userdata.surname}`,
            totalGain: 0,
            totalProject: 0,
            totalRequests: 0,
            totalReviews: 0,
            desc: "",
            jobTitle: "",
            reviewCount: 0,
            rating: 0,
          };
          await addUserToDatabase(user);
          // await addUserToDatabase(userdata);
        } else {
          // If the status is not complete, check why. User may need to
          // complete further steps.

          setError("Unknown error occur");
        }
      } else {
        setError("Unknown error occur");
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      const errorMessage = err?.errors?.[0]?.longMessage || err;
      setError(errorMessage);
    }
  };

  return { error, status, onVerifyPress, onSignUpPress };
};

export default useRegisterUser;
