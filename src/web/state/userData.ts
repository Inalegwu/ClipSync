import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface UserState {
  appId: string | undefined;
  setAppId: (id: string) => void;
}

export const useUserState = create<UserState>()(
  persist(
    (set) => ({
      appId: undefined,
      setAppId: (id: string) => set(() => ({ appId: id })),
    }),
    { name: "userData" }
  )
);
