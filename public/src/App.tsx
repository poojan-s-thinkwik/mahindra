import './App.css';
import { CustomProvider } from 'rsuite';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './features/login/Login';
import Layout from './components/layouts/Layout';
import NotFoundPage from './components/NotFound';
import DynamicRoute from './routes/DynamicRoute';
import ErrorBoundary from './ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import AuthGuard from './AuthGuard';
import { GlobalProvider } from './context/GlobalContext';
import Dashbaord from './features/dashbaord/Dashboard';

import "react-toastify/dist/ReactToastify.css";


const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <GlobalProvider>
            <Routes>
              <Route path="/" element={<AuthGuard />}>
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Dashbaord />} />
                  <Route path="*" element={<DynamicRoute />} />
                </Route>
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </GlobalProvider>
      </Router>
    </>
  );
};

// const WrappedApp = () => (
//   <AuthProvider>
//     <CustomProvider theme="light">
//       <Router>
//         <ErrorBoundary>
//           <App />
//         </ErrorBoundary>
//       </Router>
//     </CustomProvider>
//   </AuthProvider>
// );

export default App;
