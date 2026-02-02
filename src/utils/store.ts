import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { IStore, TokenState, GpuState } from "@/types";

export const useStorage = create<IStore>()(
  devtools(
    persist(
      (set) => ({
        token: {
          time: 0,
        } as TokenState,
        setToken: (token: TokenState) => set({ token }),
        gpu: {
          time: 0,
        } as GpuState,
        setGpu: (gpu: GpuState) => set({ gpu }),
        docsLinkTracks: {},
        setDocsLinkTracks: (data) => set((state) => ({ docsLinkTracks: data })),
      }),
      {
        name: "akash-network",
        getStorage: () => localStorage,
      },
    ),
  ),
);
