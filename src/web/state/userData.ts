import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Middlware } from "../../shared/utils/types";

export interface UserState {
  appId: string | undefined;
  setAppId: (id: string) => void;
}

export const useUserState = create<UserState>()(
  persist(
    (set) => ({
      appId: "",
      setAppId: (id: string) => set(() => ({ appId: id })),
    }),
    { name: "userData" }
  )
);
