import { Network } from "../types";
import { cn } from "../utils";
import { TableCell, TableRow } from "./ui/Table";
import WifiIcon from "./WifiIcon";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "./ui/Dialog";
import { Button } from "./ui/Button";
import { invoke } from "@tauri-apps/api";
import { useStationsStore } from "../stationsStore";
import { useState } from "react";
import { Input } from "./ui/Input";
import { useNetworksStore } from "../networksStore";
import { useUpdateNetworks } from "../hooks";

interface NetworkRowProps {
  network: Network;
}

interface ConnectRes {
  error: string;
}

const NetworkRow: React.FC<NetworkRowProps> = ({ network }) => {
  const [password, setPassword] = useState<string>("");

  const networksStore = useNetworksStore();
  const stationsStore = useStationsStore();
  const stations = stationsStore?.stations;
  if (!stations) return;

  const connectToNetwork = async () => {
    const res: ConnectRes = await invoke("connect", {
      network: network.name,
      station: stations[0].name,
      password: password,
    });

    console.log(res);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const disconnectFromNetwork = async () => {
    await invoke("disconnect", {
      station: stations[0].name,
    });
  };

  const onClick = async () => {
    console.log("меня нажали");
    if (network.connected) {
      await disconnectFromNetwork();
      console.log("я отключился");
    } else {
      await connectToNetwork();
      console.log("подключился!!!");
    }

    const [stations, networks] = await useUpdateNetworks();
    stationsStore.setStations(stations);
    networksStore.setNetworks(networks);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow
          className={cn(
            "cursor-pointer",
            "hover:bg-sky-100 transition-all", // uncomment on production
            network.connected && "bg-sky-50/75",
          )}
        >
          <TableCell>{network.name}</TableCell>
          <TableCell>{network.password ? "да" : "нет"}</TableCell>
          <TableCell>
            <WifiIcon signal={network.signal} />
          </TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="bg-gray-300">
        <DialogHeader>
          <DialogTitle className="text-center">{network.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <Button className="w-40 bg-sky-100 mb-2 mt-2" onClick={onClick}>
            {network.connected ? "отключиться" : "подключиться"}
          </Button>
          {!network.connected && (
            <Input
              placeholder="Пароль"
              type="password"
              onChange={onChange}
              className="w-60 border-gray-400 placeholder-gray-700"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NetworkRow;
