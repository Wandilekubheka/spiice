import { UserModel } from "@/@types/userModel";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { jobCard } from "../@types/jobCard";

const searchByName = async (name: string) => {
  try {
    // Create a query against the collection.
    const snapShotQuery = query(
      collection(db, "proposals"),
      where("creator", ">=", name)
    );
    const docs = await getDocs(snapShotQuery);
    if (docs.empty) {
      console.log("No matching documents.");
      return [];
    }

    return docs.docs.map((doc) => doc.data() as jobCard);
  } catch (error) {
    console.error("Error searching user by name:", error);
    throw new Error("an error occurred while searching for users");
  }
};

const addProposal = async (proposal: jobCard) => {
  try {
    const docRef = await addDoc(collection(db, "proposals"), proposal);
    console.log("Proposal added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding proposal: ", error);
    throw new Error("an error occurred while adding the proposal");
  }
};

export { searchByName, addProposal };
