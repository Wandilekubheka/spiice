import { OfferStatus } from "@/features/@types/offerstatus";

export type projectType = {
  userID: string;
  title: string;
  clientName: string;
  status: OfferStatus;
};
