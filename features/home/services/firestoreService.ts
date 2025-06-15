import { db } from "@/firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { projectType } from "@/@types/ProjectType";

const getActiveTasksForUser = async (
  userID: string,
  setProjects: (projects: projectType[]) => void
) => {
  try {
    //query project by userID
    const q = query(collection(db, "projects"), where("userID", "==", userID));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let data: projectType[] = [];
      snapshot.forEach((doc) => {
        if (doc.exists()) {
          data = [...data, doc.data() as unknown as projectType];
        }
      });
      setProjects(data);
    });

    return unsubscribe;
  } catch (e: any) {
    throw new Error(e.code);
  }
};

const addActiveTask = async (project: projectType) => {
  try {
    await addDoc(collection(db, "projects"), project);
  } catch (e: any) {
    throw new Error(e.code);
  }
};

export { getActiveTasksForUser, addActiveTask };
