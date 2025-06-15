import { db } from "@/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
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

    return docs.docs.map((doc) => {
      const docData = doc.data() as jobCard;
      // Convert Firestore Timestamp to JS Date
      const date = docData.postedDate as Timestamp;
      docData.postedDate = date.toDate().toLocaleDateString();
      return docData;
    });
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
