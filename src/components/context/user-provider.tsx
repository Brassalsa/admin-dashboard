"use client";
import { Status } from "@/lib/constants/user";
import { generateUser } from "@/lib/utils/user";
import { User } from "@/types";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const UserCtx = createContext<{
  user: User | null;
  setUser: Dispatch<User | null>;
} | null>(null);

export const useUserCtx = () => {
  const ctx = useContext(UserCtx);
  if (!ctx) {
    throw new Error("useUserCtx must be used inside UserProvider");
  }
  return ctx;
};

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!user) setUser({ ...generateUser(), status: Status.Active });
  }, []);

  return (
    <UserCtx.Provider value={{ user, setUser }}>{children}</UserCtx.Provider>
  );
}
