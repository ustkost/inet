import { GrWifi, GrWifiLow, GrWifiMedium, GrWifiNone } from "react-icons/gr";

interface WifiIconProps {
  signal: number;
}

const WifiIcon: React.FC<WifiIconProps> = ({ signal }) => {
  return (
    <>
      {(signal == 1 || signal == 0) && <GrWifiNone size={30} />}
      {signal == 2 && <GrWifiLow size={30} />}
      {signal == 3 && <GrWifiMedium size={30} />}
      {signal == 4 && <GrWifi size={30} />}
    </>
  );
};

export default WifiIcon;
