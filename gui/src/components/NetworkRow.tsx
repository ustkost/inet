import { Network } from "../types";
import { cn } from "../utils";
import { TableCell, TableRow } from "./ui/Table";
import WifiIcon from "./WifiIcon";
import { Dialog, DialogTrigger } from "./ui/Dialog";
import NetworkDialog from "./NetworkDialog";

interface NetworkRowProps {
  network: Network;
}

const NetworkRow: React.FC<NetworkRowProps> = ({ network }) => {
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
      <NetworkDialog network={network} />
    </Dialog>
  );
};

export default NetworkRow;
