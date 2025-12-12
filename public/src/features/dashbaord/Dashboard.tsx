import { useState } from 'react';
import CapacityUtilization from './components/CapacityUtilization';
import CustomButton from './components/CustomButton';
import DashboardFiterForm from '../../components/FiterForm';
import IdleTime from './components/IdleTime';
import StartupLosses from './components/StartupLosses';
import DistanceTraveled from './components/DistanceTraveled';
import GeofenceBreach from './components/GeofenceBreach';

const NAVIGATE_TEXT = {
  CAPACITY_UTILIZATION: 'CAPACITY_UTILIZATION',
  IDLE_TIME: 'IDLE_TIME',
  START_UP_LOSSES: 'START_UP_LOSSES',
  DISTANCE_TRAVELED: 'DISTANCE_TRAVELED',
  GEO_FENCE_BREACH: 'GEO_FENCE_BREACH',
} as const;

type NavigateText = keyof typeof NAVIGATE_TEXT;

const Dashbaord = () => {
  const [activeComponent, setActiveComponent] = useState<NavigateText | null>(
    null
  );
  const handleNavigate = (title: NavigateText) => {
    setActiveComponent(title);
  };
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case NAVIGATE_TEXT.CAPACITY_UTILIZATION:
        return <CapacityUtilization />;
      case NAVIGATE_TEXT.IDLE_TIME:
        return <IdleTime />;
      case NAVIGATE_TEXT.START_UP_LOSSES:
        return <StartupLosses />;
      case NAVIGATE_TEXT.DISTANCE_TRAVELED:
        return <DistanceTraveled />;
      case NAVIGATE_TEXT.GEO_FENCE_BREACH:
        return <GeofenceBreach />;
      default:
        return <CapacityUtilization />;
    }
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            Dashboard
          </span>
          <span className="text-gray-600">Welcome back, John Doe</span>
        </div>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          <DashboardFiterForm />
          <div className="my-4 flex justify-between items-center">
            <CustomButton
              text="Capacity Utilization"
              backgroundColor="linear-gradient(to right, #2BC6B4, #3B89B8)"
              width="195px"
              height="47.53px"
              handleNavigate={() => handleNavigate('CAPACITY_UTILIZATION')}
            />
            <CustomButton
              text="dle Time"
              backgroundColor="linear-gradient(90deg, #FFB329, #F981A7)"
              width="195px"
              height="47.53px"
              handleNavigate={() => handleNavigate('IDLE_TIME')}
            />
            <CustomButton
              text="Start-up Losses"
              backgroundColor="linear-gradient(to right, #4911DD, #5AC5F1)"
              width="195px"
              height="47.53px"
              handleNavigate={() => handleNavigate('START_UP_LOSSES')}
            />
            <CustomButton
              text="Distance traveled"
              backgroundColor="linear-gradient(90deg, #2BC6B4, #42E395)"
              width="195px"
              height="47.53px"
              handleNavigate={() => handleNavigate('DISTANCE_TRAVELED')}
            />
            <CustomButton
              text="Geo-fence breach"
              backgroundColor="linear-gradient(to right, #4911DD, #5AC5F1)"
              width="195px"
              height="47.53px"
              handleNavigate={() => handleNavigate('GEO_FENCE_BREACH')}
            />
          </div>
          <div>{renderActiveComponent()}</div>
        </div>
      </div>
    </>
  );
};

export default Dashbaord;
