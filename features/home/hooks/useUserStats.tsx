import { useEffect, useState } from "react";
import { UserModel } from "@/@types/userModel";
import { getUserFromDatabase } from "@/features/auth/service/auth_service";
import { projectType } from "@/@types/ProjectType";
import {
  addActiveTask,
  getActiveTasksForUser,
} from "../services/firestoreService";

const useUserStats = (userID: string) => {
  const [userData, setUserData] = useState<UserModel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userProjects, setUserProjects] = useState<projectType[] | null>(null);
  useEffect(() => {
    getUserFromDatabase(userID)
      .then((user) => {
        setUserData(user);
        getActiveTasksForUser(userID, setUserProjects).then((unsubscribe) => {
          // Unsubscribe from the listener when the component unmounts
          return () => unsubscribe();
        });
      })
      .catch((error: string) => {
        setError(error);
      });
  }, [userID]);

  const createActiveTask = async (project: projectType) => {
    try {
      await addActiveTask(project);
    } catch (e: any) {
      setError(e);
    }
  };

  return { userData, error, userProjects, createActiveTask };
};

export default useUserStats;
