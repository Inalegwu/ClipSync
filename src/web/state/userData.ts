import { v4 } from "uuid";
import { create } from "zustand";

export interface UserState {
  appId: string;
  setEmail: (email: string) => void;
  setAppId: (id: string) => void;
}

export const useUserState = create<UserState>((set) => ({
  appId: "",
  setEmail: (email: string) => () => ({ email: email }),
  setAppId: (id) => set(() => ({ appId: id })),
}));
