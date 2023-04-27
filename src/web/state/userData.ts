import { v4 } from "uuid";
import { create } from "zustand";

export interface UserState {
  email: string | null;
  appId: string;
  setEmail: (email: string) => void;
  setAppId: (id: string) => void;
}

export const useUserState = create<UserState>((set) => ({
  email: null,
  appId: "",
  setEmail: (email: string) => () => ({ email: email }),
  setAppId: (id) => set(() => ({ appId: id })),
}));
