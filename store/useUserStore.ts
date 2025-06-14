import { emptyUser, UserModel } from "@/@types/userModel";
import { create } from "zustand";
export type UserStoreType = {
  user: UserModel;
  setUser: (user: UserModel) => void;
  clearUser: () => void;
};

const useUserrStore = create<UserStoreType>((set) => ({
  user: emptyUser,
  setUser: (user: UserModel) => set({ user }),
  clearUser: () => set({ user: emptyUser }),
}));
export default useUserrStore;
