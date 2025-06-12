import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ProjectStatus } from "../../@types/ProjectStatus";
import { projectType } from "@/@types/ProjectType";

const getActiveTasksForUser = async (userID: string) => {
  try {
    //query project by userID
    const q = query(collection(db, "projects"), where("userID", "==", userID));
    let data: projectType[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        data = [...data, doc.data() as unknown as projectType];
      }
    });
    return data;
  } catch (e: any) {
    throw new Error(e.code);
  }
};

export default getActiveTasksForUser;
