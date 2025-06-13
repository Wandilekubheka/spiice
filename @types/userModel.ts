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
