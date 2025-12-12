import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../components/NotFound';
import Dashbaord from '../features/dashbaord/Dashboard';
import Organization from '../features/organization/Organization';
import Tenant from '../features/tenant/Tenant';
import Site from '../features/site/Site';
import Cluster from '../features/cluster/Cluster';
import Mhe from '../features/mhe/Mhe';
import AddMheForm from '../features/mhe/AddMheForm';
import Multitrack from '../features/multitrack/Multitrack';
import Shift from '../features/shift/Shift';
import ShiftForm from '../features/shift/ShiftForm';
import Location from '../features/location/Location';
import LocationForm from '../features/location/LocationForm';
import IdleReport from '../features/reports/idle/IdleReport';
import OfflineReport from '../features/reports/offline/OfflineReport';
import NewDevice from '../features/reports/newDevice/NewDeviceReport';
import OverspeedReport from '../features/reports/overspeed/Overspeed';
import CapacityUtilizationReport from '../features/reports/capacityUtilization/CapacityUtilization';
import DistanceTraveled from '../features/reports/distanceTraveled/DistanceTraveled';
import StartupLossesReport from '../features/reports/StartupLosses/StartupLosses';
import Geofence from '../features/geofence/Geofence';
import GeofenceCreate from '../features/geofence/GeofenceCreate';
import User from '../features/user/User';
import { AddUser } from '../features/user/AddUser';
import AddCluster from '../features/cluster/AddCluster';
import Device from '../Device/Device';
import AddDevice from '../Device/AddDevice';
import DeviceType from '../Device/DeviceType';
import AddDeviceType from '../Device/AddDeviceType';
import EditMhe from '../features/mhe/EditMhe';
import EditShift from '../features/shift/EditShift';
import EditWarehouse from '../features/location/EditWarehouse';
import EditUser from '../features/user/EditUser';

const DynamicRoute = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Dashbaord />} /> */}
      <Route path="/organizations" element={<Organization />} />
      <Route path="/tenants" element={<Tenant />} />
      <Route path="/sites" element={<Site />} />
      <Route path="/clusters" element={<Cluster />} />
      <Route path="/clusters/create" element={<AddCluster />} />
      <Route path="/mhe" element={<Mhe />} />
      <Route path="/mhe/create" element={<AddMheForm />} />
      <Route path="/multitrack" element={<Multitrack />} />
      <Route path="/shift" element={<Shift />} />
      <Route path="/shift/create" element={<ShiftForm />} />
      <Route path="/location" element={<Location />} />
      <Route path="/location/create" element={<LocationForm />} />
      <Route path="/report/idle" element={<IdleReport />} />
      <Route path="/report/offline" element={<OfflineReport />} />
      <Route path="/report/new-device" element={<NewDevice />} />
      <Route path="/report/overspeed" element={<OverspeedReport />} />
      <Route
        path="/report/capacity-utilization"
        element={<CapacityUtilizationReport />}
      />
      <Route path="/report/distance-traveled" element={<DistanceTraveled />} />
      <Route path="/report/start-up-losses" element={<StartupLossesReport />} />
      <Route path="/geofence" element={<Geofence />} />
      <Route path="/geofence/create" element={<GeofenceCreate />} />
      <Route path="/user" element={<User />} />
      <Route path="/user/create" element={<AddUser />} />
      <Route path="/device" element={<Device />} />
      <Route path="/device/create" element={<AddDevice />} />
      <Route path="/device-type" element={<DeviceType />} />
      <Route path="/device-type/create" element={<AddDeviceType />} />
      <Route path="/mhe/edit/:id" element={<EditMhe />} />
      <Route path="/shift/edit/:id" element={<EditShift />} />
      <Route path="/warehouse/edit/:id" element={<EditWarehouse />} />
      <Route path="/user/edit/:id" element={<EditUser />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default DynamicRoute;
