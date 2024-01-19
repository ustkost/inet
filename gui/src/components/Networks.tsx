import { useNetworksStore } from "../networksStore";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/Table";
import NetworkRow from "./NetworkRow";

const Networks = () => {
  const networksStore = useNetworksStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>название сети</TableHead>
          <TableHead>пароль</TableHead>
          <TableHead>сигнал</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {networksStore.networks?.map((network) => (
          <NetworkRow network={network} key={network.name} />
        ))}
      </TableBody>
    </Table>
  );
};

export default Networks;
