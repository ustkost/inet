import { Network, Station } from "./types";
import { invoke } from "@tauri-apps/api";

export async function useUpdateNetworks(): Promise<[Station[], Network[]]> {
  const stations: Station[] = await invoke("get_stations");
  const networks: Network[] = await invoke("get_networks", {
    station: stations[0].name,
  });
  return [stations, networks];
}
