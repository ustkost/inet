import { create } from "zustand";
import { Network } from "./types";

interface NetworksStore {
  networks: Network[] | undefined;
  setNetworks: (newNetworks: Network[]) => void;
}

export const useNetworksStore = create<NetworksStore>()((set) => ({
  networks: undefined,
  setNetworks: (newNetworks) => set(() => ({ networks: newNetworks })),
}));
