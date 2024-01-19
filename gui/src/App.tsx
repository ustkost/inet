import { useEffect } from "react";
import { Grid } from "react-loader-spinner";
import Networks from "./components/Networks";
import { useNetworksStore } from "./networksStore";
import { useStationsStore } from "./stationsStore";
import { useUpdateNetworks } from "./hooks";
import { Toaster } from "react-hot-toast";
import RefreshNetworks from "./components/RefreshNetworks";

const App = () => {
  const networksStore = useNetworksStore();
  const stationsStore = useStationsStore();

  useEffect(() => {
    const getNetworks = async () => {
      const [stations, networks] = await useUpdateNetworks();
      console.log(stations, networks);
      stationsStore.setStations(stations);
      networksStore.setNetworks(networks);
    };

    getNetworks();
  });

  return (
    <>
      <Toaster />
      <div className="mt-10 ml-5 mr-5 flex flex-col h-full items-center">
        <div className="flex items-center">
          <h1 className="mt-10 text-center font-extrabold text-7xl mb-20">
            inet
          </h1>
          <RefreshNetworks />
        </div>
        {networksStore.networks ? <Networks /> : <Grid />}
      </div>
    </>
  );
};

export default App;
