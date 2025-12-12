import './sidebar.css';
import logo from '../../assets/loginpage_logo.jpeg';
import homeIcon from '../../assets/icons/Home.png';
import trackingIcon from '../../assets/icons/tracking.png';
import reportIcon from '../../assets/icons/report1.png';
import settingIcon from '../../assets/icons/setting3.png';
import logoutIcon from '../../assets/icons/logout1.png';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '@rsuite/icons/ArrowRight';

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  
  const logout = () => {
    localStorage.clear();
    window.location.href = "/#/login";
  }
  
  return (
    <div className={`sidebar ${isSidebarOpen ? 'w-24' : 'w-60'}`}>
      <div className="w-[90%] p-4 rounded-3xl overflow-hidden">
        <img
          src={logo}
          alt="GENTRAX logo"
          className="object-contain rounded-xl"
        />
      </div>
      <ul>
        <li className="sidebar-item hoverable">
          <Link to="/" className="nav-link hover:no-underline">
            <img src={homeIcon} alt="dashboard" />
            <span className={`text-xs mt-1 ${isSidebarOpen ? 'hidden' : ''}`}>
              Dashboard
            </span>
          </Link>
        </li>
        <li className="sidebar-item hoverable">
          <Link to="/multitrack" className="nav-link hover:no-underline">
            <img src={trackingIcon} alt="tracking" />
            <span className={`text-xs mt-1 ${isSidebarOpen ? 'hidden' : ''}`}>
              Tracking
            </span>
          </Link>
        </li>
        <li className="sidebar-item hoverable">
          <div className="nav-link">
            <img src={reportIcon} alt="report" />
            <span className={`text-xs mt-1 ${isSidebarOpen ? 'hidden' : ''}`}>
              Reports
            </span>
          </div>
          <ReportsSubMenu />
        </li>
        <li className="sidebar-item hoverable">
          <div className="nav-link">
            <img src={settingIcon} alt="setting" />
            <span className={`text-xs mt-1 ${isSidebarOpen ? 'hidden' : ''}`}>
              Settings
            </span>
          </div>
          <SettingsSubMenu />
        </li>
      </ul>
      <ul className=" absolute bottom-0">
        <li className="nav-item cursor-pointer">
          <div className="nav-link" onClick={logout}>
            <img src={logoutIcon} alt="setting" />
            <span className={`text-xs mt-1 ${isSidebarOpen ? 'hidden' : ''}`}>
              Logout
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};
const ReportsSubMenu: React.FC = () => (
  <ul className="sub-menu block">
    <li className="sub-menu-item">
      <div className="nav-link vehicle-activity-link">
        Vehicle Activity <ArrowRightIcon style={{ fontSize: '20px' }} />
      </div>
      <ul className="nested-sub-menu">
        <li>
          <Link to="/report/idle" className="nav-link">
            Idle Time
          </Link>
        </li>
        <li>
          <Link to="/report/offline" className="nav-link">
            Offline
          </Link>
        </li>
        <li>
          <Link to="/report/new-device" className="nav-link">
            New Device
          </Link>
        </li>
        <li>
          <Link to="/report/overspeed" className="nav-link">
            Overspeed
          </Link>
        </li>
      </ul>
    </li>
    <li className="sub-menu-item">
      <Link to="/report/capacity-utilization" className="nav-link">
        Capacity Utilization
      </Link>
    </li>
    <li className="sub-menu-item">
      <Link to="/report/distance-traveled" className="nav-link">
        Distance Traveled
      </Link>
    </li>
    <li className="sub-menu-item">
      <Link to="/report/start-up-losses" className="nav-link">
        Start Up Losses
      </Link>
    </li>
  </ul>
);
const SettingsSubMenu: React.FC = () => (
  <ul className="sub-menu block">
    <li className="sub-menu-item">
      <div className="nav-link vehicle-activity-link">
        Master <ArrowRightIcon style={{ fontSize: '20px' }} />
      </div>
      <ul className="nested-sub-menu">
        {/* <li>
          <Link to="/organizations" className="nav-link">
            Organizations
          </Link>
        </li>
        <li>
          <Link to="/tenants" className="nav-link">
            Tenants
          </Link>
        </li>
        <li>
          <Link to="/sites" className="nav-link">
            Sites
          </Link>
        </li>
        <li>
          <Link to="/clusters" className="nav-link">
            Clusters
          </Link>
        </li> */}
        <li>
          <Link to="/mhe" className="nav-link">
            MHE
          </Link>
        </li>
        <li>
          <Link to="/shift" className="nav-link">
            Shift
          </Link>
        </li>
        <li>
          <Link to="/location" className="nav-link">
            Warehouse
          </Link>
        </li>
      </ul>
    </li>
    <li className="sub-menu-item">
      <div className="nav-link vehicle-activity-link">
        General <ArrowRightIcon style={{ fontSize: '20px' }} />
      </div>
      <ul className="nested-sub-menu">
        <li>
          <Link to="/user" className="nav-link">
            Users
          </Link>
        </li>
        <li>
          <Link to="/device" className="nav-link">
            Devices
          </Link>
        </li>
        <li>
          <Link to="/clusters" className="nav-link">
            Clusters
          </Link>
        </li>
      </ul>
    </li>
  </ul>
);

export default Sidebar;
