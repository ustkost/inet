import { IoMdRefresh } from "react-icons/io";
import { useUpdateNetworks } from "../hooks";
import { useNetworksStore } from "../networksStore";
import { useStationsStore } from "../stationsStore";

const RefreshNetworks = () => {
  const networksStore = useNetworksStore();
  const stationsStore = useStationsStore();

  const onClick = async () => {
    const [stations, networks] = await useUpdateNetworks();
    stationsStore.setStations(stations);
    networksStore.setNetworks(networks);
  };

  return (
    <div onClick={onClick} className="ml-10 mb-6 cursor-pointer">
      <IoMdRefresh size={65} className="hover:text-gray-900" />
    </div>
  );
};

export default RefreshNetworks;
