import { useState } from "react";
import { Network } from "../types";
import { Button } from "./ui/Button";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog";
import { Input } from "./ui/Input";
import { invoke } from "@tauri-apps/api";
import { useNetworksStore } from "../networksStore";
import { useStationsStore } from "../stationsStore";
import { useUpdateNetworks } from "../hooks";
import toast from "react-hot-toast";
import { cn } from "../utils";
import { Grid } from "react-loader-spinner";

interface NetworkDialogProps {
  network: Network;
}

interface ConnectRes {
  error: string;
}

const NetworkDialog: React.FC<NetworkDialogProps> = ({ network }) => {
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const networksStore = useNetworksStore();
  const stationsStore = useStationsStore();
  const stations = stationsStore?.stations;
  if (!stations) return;

  const showPasswordInput = !network.connected && network.password;

  const connectToNetwork = async () => {
    const res: ConnectRes = await invoke("connect", {
      network: network.name,
      station: stations[0].name,
      password: password,
    });
    if (res.error) {
      toast.error("Не удалось подключиться к сети");
    } else {
      toast.success("Подключение к сети успешно");
    }
  };

  const disconnectFromNetwork = async () => {
    await invoke("disconnect", {
      station: stations[0].name,
    });

    toast.success("Вы отключились от сети");
  };

  const onClick = async () => {
    setIsLoading(true);
    if (network.connected) {
      await disconnectFromNetwork();
    } else {
      await connectToNetwork();
    }

    setIsLoading(false);

    const [stations, networks] = await useUpdateNetworks();
    stationsStore.setStations(stations);
    networksStore.setNetworks(networks);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <DialogContent className="bg-gray-300">
      <DialogHeader>
        <DialogTitle className="text-center">{network.name}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col items-center">
        <Button
          className={cn("w-40 bg-sky-100 mb-2 mt-2", isLoading && "disabled")}
          onClick={onClick}
        >
          {isLoading ? (
            <Grid size={20} />
          ) : network.connected ? (
            "отключиться"
          ) : (
            "подключиться"
          )}
        </Button>
        {showPasswordInput && (
          <Input
            placeholder="Пароль"
            type="password"
            onChange={onChange}
            className="w-60 border-gray-400 placeholder-gray-700"
          />
        )}
      </div>
    </DialogContent>
  );
};

export default NetworkDialog;
