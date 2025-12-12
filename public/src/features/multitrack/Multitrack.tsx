import { useState } from 'react';
import MapComponent from './components/MapComponent';
import MheStatusPanel from './components/MheStatusPanel';
import TrackingPanel from './components/TrackingPanel';

export default function Multitrack() {
  const [isMheStatusVisible, setIsMheStatusVisible] = useState(false);
  const handleRightPanel = () => {
    setIsMheStatusVisible(!isMheStatusVisible);
  };
  return (
    <>
      <div className="relative flex-1 bg-black h-screen rounded-md">
        <TrackingPanel handleRightPanel={handleRightPanel} />
        <MapComponent />
        {isMheStatusVisible && (
          <MheStatusPanel
            handleRightPanel={handleRightPanel}
            isShowPanel={isMheStatusVisible}
          />
        )}
      </div>
    </>
  );
}
