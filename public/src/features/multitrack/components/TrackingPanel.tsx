import ISearch from './ISearch';
import { FaWifi } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa';
import { FaBatteryFull } from 'react-icons/fa';
import { FaBolt } from 'react-icons/fa';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';
import { useState } from 'react';
import ArrowLeftIcon from '@rsuite/icons/ArrowLeft';

type Device = {
  id: string;
  name: string;
  timestamp: string;
  speed: number;
  hasGPS: boolean;
  hasIgnition: boolean;
  hasBattery: boolean;
  hasExternalPower: boolean;
  address: string;
  color: string;
};

const devices: Device[] = [
  {
    id: '1',
    name: 'RT843',
    timestamp: '20/11/2024, 16:26:02',
    speed: 0,
    hasGPS: true,
    hasIgnition: true,
    hasBattery: true,
    hasExternalPower: true,
    address: '-',
    color: 'rgb(0,0,255)',
  },
  {
    id: '2',
    name: 'RT825',
    timestamp: '20/11/2024, 18:29:59',
    speed: 0,
    hasGPS: true,
    hasIgnition: false,
    hasBattery: true,
    hasExternalPower: false,
    address: '-',
    color: 'rgb(0,0,255)',
  },
  {
    id: '3',
    name: 'BT REFLEX03',
    timestamp: '8/4/2024, 13:55:35',
    speed: 0,
    hasGPS: false,
    hasIgnition: false,
    hasBattery: true,
    hasExternalPower: false,
    address: '-',
    color: 'rgb(255,165,0)',
  },
  {
    id: '4',
    name: 'BT REFLEX03',
    timestamp: '8/4/2024, 13:55:35',
    speed: 0,
    hasGPS: false,
    hasIgnition: false,
    hasBattery: true,
    hasExternalPower: false,
    address: '-',
    color: 'rgb(255,165,0)',
  },
  {
    id: '5',
    name: 'BT REFLEX03',
    timestamp: '8/4/2024, 13:55:35',
    speed: 0,
    hasGPS: false,
    hasIgnition: false,
    hasBattery: true,
    hasExternalPower: false,
    address: '-',
    color: 'rgb(255,165,0)',
  },
  {
    id: '6',
    name: 'BT REFLEX03',
    timestamp: '8/4/2024, 13:55:35',
    speed: 0,
    hasGPS: false,
    hasIgnition: false,
    hasBattery: true,
    hasExternalPower: false,
    address: '-',
    color: 'rgb(255,165,0)',
  },
  {
    id: '7',
    name: 'BT REFLEX03',
    timestamp: '8/4/2024, 13:55:35',
    speed: 0,
    hasGPS: false,
    hasIgnition: false,
    hasBattery: true,
    hasExternalPower: false,
    address: '-',
    color: 'rgb(255,165,0)',
  },
  {
    id: '8',
    name: 'BT REFLEX03',
    timestamp: '8/4/2024, 13:55:35',
    speed: 0,
    hasGPS: false,
    hasIgnition: false,
    hasBattery: true,
    hasExternalPower: false,
    address: '-',
    color: 'rgb(255,165,0)',
  },
  {
    id: '9',
    name: 'BT REFLEX03',
    timestamp: '8/4/2024, 13:55:35',
    speed: 0,
    hasGPS: false,
    hasIgnition: false,
    hasBattery: true,
    hasExternalPower: false,
    address: '-',
    color: 'rgb(255,165,0)',
  },
];

interface TrackingPanelProps {
  handleRightPanel: () => void;
}

const TrackingPanel: React.FC<TrackingPanelProps> = ({ handleRightPanel }) => {
  const [isTrackShow, setIsTrackShow] = useState(false);
  return (
    <>
      <div
        className={`absolute transition-all top-0 ${isTrackShow ? '-left-[452px]' : 'left-0'} w-[452px] rounded-md bg-white h-full p-3 z-[99999]`}
      >
        <div className="border border-[#1d31a6] rounded-md h-full relative">
          <div
            className="absolute top-0 -right-12 h-14 bg-[#FFF] cursor-pointer rounded-tr-lg rounded-br-lg text-4xl flex items-center justify-center"
            onClick={() => setIsTrackShow(!isTrackShow)}
          >
            {isTrackShow ? <ArrowRightIcon /> : <ArrowLeftIcon />}
          </div>
          <div className="flex flex-row">
            <div className="bg-[green] flex flex-col basis-1/4 cursor-pointer text-center p-2 h-16 rounded-tl-md">
              <div>1</div>
              <div className="text-[11px]">Working</div>
            </div>
            <div className="bg-[#d9ecd9] flex flex-col basis-1/4 cursor-pointer text-center p-2 h-16">
              <div className="text-wrap">1</div>
              <div className="text-[11px]">Running</div>
            </div>
            <div className="bg-[#fff6da] flex flex-col basis-1/4 cursor-pointer text-center p-2 h-16">
              <div>1</div>
              <div className="text-[11px]">Idle</div>
            </div>
            <div className="bg-[#ffd9d9] flex flex-col basis-1/4 cursor-pointer text-center p-2 h-16">
              <div>1</div>
              <div className="text-[11px]">Parked</div>
            </div>
            <div className="bg-[#d9daff] flex flex-col basis-1/4 cursor-pointer text-center p-2 h-16">
              <div>1</div>
              <div className="text-[11px]">Offline</div>
            </div>
            <div className="bg-[#ececec] flex flex-col basis-1/4 cursor-pointer text-center p-2 h-16">
              <div className="align-text-top">1</div>
              <div className="text-[11px]">New Device</div>
            </div>
            <div className="bg-[#d9d9d9] flex flex-col basis-1/4 cursor-pointer text-center p-2 h-16 rounded-tr-md">
              <div>6</div>
              <div className="text-[11px]">Total</div>
            </div>
          </div>
          <div className="p-1 shadow-sm">
            <ISearch />
          </div>
          <div className="mhe-list bg-white p-2 overflow-scroll h-[calc(100vh-150px)] mt-2">
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex items-center border-b py-2 last:border-none cursor-pointer"
                onClick={handleRightPanel}
              >
                <div
                  className="h-[10px] w-[10px] rounded-full mr-4"
                  style={{ backgroundColor: device.color }}
                ></div>
                <div className="flex-1">
                  <div>{device.name}</div>
                  <div className="text-gray-500 text-sm">
                    {device.timestamp}
                  </div>
                </div>
                <span className="w-8 text-center">{device.speed}</span>
                <span className="w-8 text-center">
                  {device.hasGPS ? (
                    <FaWifi className="text-success text-[18px]" />
                  ) : (
                    <FaWifi className="text-gray-400 text-[18px]" />
                  )}
                </span>
                <span className="w-8 text-center">
                  {device.hasIgnition ? (
                    <FaKey className="text-success text-[18px]" />
                  ) : (
                    <FaKey className="text-gray-400" />
                  )}
                </span>
                <span className="w-8 text-center">
                  {device.hasBattery ? (
                    <FaBatteryFull className="text-success text-[18px]" />
                  ) : (
                    <FaBatteryFull className="text-gray-400 text-[18px]" />
                  )}
                </span>
                <span className="w-8 text-center">
                  {device.hasExternalPower ? (
                    <FaBolt className="text-success text-[18px]" />
                  ) : (
                    <FaBolt className="text-gray-400 text-[18px]" />
                  )}
                </span>
                <span className="ml-4 text-sm text-gray-600">
                  {device.address}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingPanel;
