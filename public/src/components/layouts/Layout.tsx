import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div
      className="flex flex-col md:flex-row h-screen overflow-hidden"
      style={{ background: '#e1e6f5' }}
    >
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="relative flex-1 flex-col">
        {/* Header */}
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-hidden ">
          <div
            style={{
              overflowY: 'auto',
              height: 'calc(100vh - 64px)',
              boxSizing: 'border-box',
            }}
            className={`transition-all  duration-300 p-2`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
