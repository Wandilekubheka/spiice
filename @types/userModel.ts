import { Timestamp } from "firebase/firestore";

export interface UserModel {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  createdAt: Timestamp | Date | string;
  totalGain: number;
  totalProject: number;
  totalRequests: number;
  totalReviews: number;
  chatsID?: string;
  desc: string;
  jobTitle: string;
  reviewCount: number;
  rating: number;
}

export const emptyUser: UserModel = {
  uid: "",
  displayName: "",
  email: "",
  createdAt: "",
  totalGain: 0,
  totalProject: 0,
  totalRequests: 0,
  totalReviews: 0,
  desc: "",
  jobTitle: "",
  reviewCount: 0,
  rating: 0,
};
