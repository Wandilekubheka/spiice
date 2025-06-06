import { Timestamp } from "firebase/firestore";

export interface UserModel {
  uid: string;
  displayName?: string;
  email: string;
  photoURL?: string;
  createdAt: Timestamp | Date | string;
}
