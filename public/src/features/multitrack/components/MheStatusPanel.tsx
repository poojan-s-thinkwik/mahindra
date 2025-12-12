import { Link } from 'react-router-dom';
import { Button } from 'rsuite';
import CloseIcon from '@rsuite/icons/Close';

interface IMheStatusPanelProps {
  handleRightPanel: () => void;
  isShowPanel: boolean;
}

const MheStatusPanel: React.FC<IMheStatusPanelProps> = ({
  handleRightPanel,
  isShowPanel,
}) => {
  return (
    <>
      <div
        className={`absolute transition-all top-5 ${isShowPanel ? 'right-0' : 'right-[-306px]'} w-[300px] rounded-md bg-white h-content p-3 z-[99999]`}
      >
        <div>
          <div
            className={`absolute top-0 ${isShowPanel ? '-left-6' : 'left-0'} h-[25px] w-[25px] bg-[#FFF] cursor-pointer rounded-full text-xl flex items-center justify-center`}
            onClick={handleRightPanel}
          >
            <CloseIcon />
          </div>
        </div>
        <Link to="/playback">
          <Button appearance="primary" className="w-full">
            Playback
          </Button>
        </Link>
        <div className="details-panel">
          <div className="flex flex-row py-1 items-center justify-between px-3">
            <p>MHE Name:</p>
            <p>RT843</p>
          </div>
          <div className="flex flex-row py-1 items-center justify-between px-3">
            <p>IMEI:</p>
            <p>1234567890</p>
          </div>
          <div className="flex flex-row py-1 items-center justify-between px-3">
            <p>Total Distance:</p>
            <p>0.00 m</p>
          </div>
          <div className="flex flex-row py-1 items-center justify-between px-3">
            <p>Distance with load:</p>
            <p>0.00 m</p>
          </div>
          <div className="flex flex-row py-1 items-center justify-between px-3">
            <p>Distance without load:</p>
            <p>0.00 m</p>
          </div>
          <div className="flex flex-row py-1 items-center justify-between px-3">
            <p>Idle Hours:</p>
            <p>01:55:17</p>
          </div>
          <div className="flex flex-row py-1 items-center justify-between px-3">
            <p>Idle Hour with load:</p>
            <p>00:00:00</p>
          </div>
          <div className="flex flex-row py-1 items-center justify-between px-3">
            <p>Idle Hour without load:</p>
            <p>01:55:17</p>
          </div>
          <div className="flex flex-row py-1 items-center justify-between px-3">
            <p>MHE Running Duration:</p>
            <p>00:00:00</p>
          </div>
          <div className="flex flex-row py-1 items-center justify-between px-3">
            <p>Total Load Duration:</p>
            <p>00:00:00</p>
          </div>
          <div className="flex flex-row py-1 items-center justify-between px-3">
            <p>Total Without load Duration:</p>
            <p>00:00:00</p>
          </div>
          <div className="flex flex-row py-1 items-center justify-between px-3">
            <p>Fork movement Duration:</p>
            <p>00:00:00</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MheStatusPanel;
