import './header.css';
import MenuIcon from '@rsuite/icons/Menu';
import CloseIcon from '@rsuite/icons/Close';
import NoticeIcon from '../../assets/icons/notificationicon.png';
import { Avatar } from 'rsuite';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}
const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  
  const { currentUser } = useContext(GlobalContext);
  
  return (
    <header
      className={`sticky top-0  z-40 h-14 flex w-full bg-white drop-shadow-1 shadow-sm}`}
    >
      <div
        className={`flex items-center justify-between w-full h-full px-4 ${isSidebarOpen ? 'ml-2' : 'ml-5'}`}
      >
        <span className="text-2xl cursor-pointer">
          {isSidebarOpen ? (
            <CloseIcon onClick={toggleSidebar} />
          ) : (
            <MenuIcon onClick={toggleSidebar} />
          )}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-2xl cursor-pointer">
            {/* <img src={NoticeIcon} alt="notificationicon" /> */}
          </span>
          <div className="flex items-center cursor-pointer">
            {/* <Avatar src="https://i.pravatar.cc/150?u=2" circle size="md" /> */}
            <div className="flex flex-col">
              <span className="ml-2">{currentUser.name}</span>
              <span className="ml-2 mt-[-0.3rem] text-gray-500">
                {currentUser.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
