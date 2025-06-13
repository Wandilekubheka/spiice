import { UserModel } from "@/@types/userModel";
import { create } from "zustand";
export type UserStoreType = {
  user: UserModel | null;
  setUser: (user: UserModel) => void;
  clearUser: () => void;
};
const useUserrStore = create<UserStoreType>((set) => ({
  user: null as UserModel | null,
  setUser: (user: UserModel) => set({ user }),
  clearUser: () => set({ user: null }),
}));
export default useUserrStore;
