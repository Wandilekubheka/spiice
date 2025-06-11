import { useEffect, useState } from "react";
import { UserModel } from "@/@types/userModel";
import { getUserFromDatabase } from "@/features/auth/service/auth_service";

const useUserStats = (userID: string) => {
  const [userData, setUserData] = useState<UserModel | null>(null);
  const [error, setError] = useState<String | null>();
  useEffect(() => {
    getUserFromDatabase(userID)
      .then((user) => {
        setUserData(user);
      })
      .catch((error) => {
        setError(error);
      });
  }, [userID]);

  return { userData, error };
};

export default useUserStats;
