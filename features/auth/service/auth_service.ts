import { UserResource } from "@clerk/types/";
import { db } from "../../../firebase";
import {
  getDoc,
  doc,
  DocumentReference,
  DocumentData,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { UserModel } from "@/@types/userModel";
import { firestoreErrors } from "../data/authErrors";
import { addPrefixToKeys } from "@/utils/prefixToKey";
const addUserToDatabase = async (user: UserModel) => {
  try {
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, user);
  } catch (error: any) {
    const code = error.code || "internal";
    const message =
      firestoreErrors[code] || "An unknown Firestore error occurred.";
    throw new Error(message);
  }
};

const getUserFromDatabase = async (user_id: string) => {
  try {
    // Get a reference to the document
    const docRef: DocumentReference<DocumentData, DocumentData> = doc(
      db,
      "users",
      user_id
    ); // get a doc matching user ID from collection users

    // Fetch the document
    const docSnap = await getDoc(docRef);

    // verify doc exists
    if (docSnap.exists()) {
      // return user UserModel
      return docSnap.data() as UserModel;
    } else {
      throw new Error(firestoreErrors["not-found"]);
    }
  } catch (e: any) {
    const message = firestoreErrors[e.code];
    throw new Error(message);
  }
};

const deleteUserFromDatabase = async (user_id: string) => {
  try {
    // get user from database
    const docRef: DocumentReference<DocumentData, DocumentData> = doc(
      db,
      "users",
      user_id
    );
    await deleteDoc(docRef);
  } catch (e: any) {
    const message = firestoreErrors[e.code];
    throw new Error();
  }
};
const updateUserFromDatabase = async (
  user_id: string,
  updatedUser: UserModel
) => {
  try {
    // get user from database
    const docRef: DocumentReference<DocumentData, DocumentData> = doc(
      db,
      "users",
      user_id
    );
    // firebase expects user. as prefix when updating values
    await updateDoc(docRef, addPrefixToKeys("user", updatedUser));
  } catch (error: any) {
    const message = firestoreErrors[error.code];
    throw new Error(message);
  }
};

export {
  addUserToDatabase,
  updateUserFromDatabase,
  deleteUserFromDatabase,
  getUserFromDatabase,
};
