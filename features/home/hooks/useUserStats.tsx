import { useEffect, useState } from "react";
import { UserModel } from "@/@types/userModel";
import { getUserFromDatabase } from "@/features/auth/service/auth_service";

const useUserStats = (userID: string) => {
  const [userData, setUserData] = useState<UserModel | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const user = await getUserFromDatabase(userID);
      setUserData(user);
    } catch (e: any) {
      setError(e);
    }
  };

  return { userData, error };
};

export default useUserStats;
