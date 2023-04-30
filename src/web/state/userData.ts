import { create } from "zustand";

export interface UserState {
  appId: string | undefined;
  setEmail: (email: string) => void;
  setAppId: (id: string) => void;
}

export const useUserState = create<UserState>((set) => ({
  appId: undefined,
  setEmail: (email: string) => () => ({ email: email }),
  setAppId: (id: string) => set(() => ({ appId: id })),
}));
