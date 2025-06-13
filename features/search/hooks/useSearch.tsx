import { useState } from "react";
import { UserModel } from "@/@types/userModel";
import { searchByName } from "../services/searchService";
import { jobCard } from "../@types/jobCard";

const useSearch = () => {
  const [searchResults, setSearchResults] = useState<jobCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const searchUserByName = async (name: string) => {
    const trimmedName = name.trim().toLowerCase();
    if (!trimmedName) {
      setSearchResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const results = await searchByName(trimmedName);
      setSearchResults(results);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, searchResults, searchUserByName };
};

export default useSearch;
