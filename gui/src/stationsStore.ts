import { create } from "zustand";
import { Station } from "./types";

interface StationsStore {
  stations: Station[] | undefined;
  setStations: (newStations: Station[]) => void;
}

export const useStationsStore = create<StationsStore>()((set) => ({
  stations: undefined,
  setStations: (newStations) => set(() => ({ stations: newStations })),
}));
