import { useState } from "react";
import { jobCard } from "../@types/jobCard";
import { OfferStatus } from "../@types/offerstatus";
import { addProposal } from "../services/searchService";

const useMakeProposal = () => {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<OfferStatus | null>(null);
  const makeProposal = async (jobCard: jobCard) => {
    try {
      await addProposal(jobCard);
      // initial status of the proposal is pending since no one has accepted it yet nor has it been rejected
      setStatus(OfferStatus.PENDING);
    } catch (error: any) {
      setError(error);
    }
  };
  return { error, status, makeProposal };
};

export default useMakeProposal;
