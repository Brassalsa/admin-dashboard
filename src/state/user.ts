import { generateUser } from "@/lib/utils/user";
import { User } from "@/types";
import { Dispatch } from "react";
import { create } from "zustand";

type UserState = {
  user: User | null;
  setUser: Dispatch<User | null>;
};
export const useUserState = create<UserState>((set) => ({
  user: generateUser(),
  setUser: (user) => set({ user }),
}));
