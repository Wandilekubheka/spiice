import { Timestamp } from "firebase/firestore";

export type jobCard = {
  creator: string;
  creatorId: string;
  creatorAvatarurl?: string;
  title: string;
  description: string;
  postedDate: string | Date | Timestamp;
  offerCount: number;
  budget: number;
  skills: string[];
};
