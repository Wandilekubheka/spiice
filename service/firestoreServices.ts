import { UserResource } from "@clerk/types/";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  DocumentReference,
  DocumentData,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { UserModel } from "@/@types/userModel";
import { addPrefixToKeys } from "@/utils/prefixToKey";
const addDocToDatabse = async (docModel: object, collectionName: string) => {
  try {
    await addDoc(collection(db, collectionName), docModel);
  } catch (error: any) {
    const code = error.code || "internal";
    throw new Error(code);
  }
};

const getdocFromDatabase = async (doc_id: string, collectionName: string) => {
  try {
    // Get a reference to the document
    const docRef: DocumentReference<DocumentData, DocumentData> = doc(
      db,
      "users",
      doc_id
    ); // get a doc matching user ID from collection users

    // Fetch the document
    const docSnap = await getDoc(docRef);
    // verify doc exists
    if (docSnap.exists()) {
      // return user UserModel
      return docSnap.data();
    } else {
      throw new Error("not-found");
    }
  } catch (e: any) {
    throw new Error(e.code);
  }
};

const deleteDocFromDatabase = async (docId: string, collectionName: string) => {
  try {
    // get user from database
    const docRef: DocumentReference<DocumentData, DocumentData> = doc(
      db,
      collectionName,
      docId
    );
    await deleteDoc(docRef);
  } catch (e: any) {
    throw new Error(e.code);
  }
};
const updateDocFromDatabase = async (
  objectId: string,
  collectionName: string,
  docObject: any
) => {
  try {
    // get user from database
    const docRef: DocumentReference<DocumentData, DocumentData> = doc(
      db,
      "users",
      objectId
    );
    // firebase expects user. as prefix when updating values
    await updateDoc(docRef, addPrefixToKeys(collectionName, docObject));
  } catch (error: any) {
    throw new Error(error.code);
  }
};

export {
  addDocToDatabse,
  getdocFromDatabase,
  updateDocFromDatabase,
  deleteDocFromDatabase,
};
