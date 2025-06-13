import { useEffect, useState } from "react";
import { UserModel } from "@/@types/userModel";
import { getUserFromDatabase } from "@/features/auth/service/auth_service";
import getActiveTasksForUser from "@/features/home/services/firestoreService";
import { projectType } from "@/@types/ProjectType";

const useUserStats = (userID: string) => {
  const [userData, setUserData] = useState<UserModel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userProjects, setUserProjects] = useState<projectType[] | null>(null);
  useEffect(() => {
    getUserFromDatabase(userID)
      .then((user) => {
        setUserData(user);
        getActiveTasksForUser(userID)
          .then((res) => setUserProjects(res))
          .catch((error: string) => {
            setError(error);
            return;
          });
      })
      .catch((error: string) => {
        setError(error);
      });
  }, [userID]);

  return { userData, error, userProjects };
};

export default useUserStats;
