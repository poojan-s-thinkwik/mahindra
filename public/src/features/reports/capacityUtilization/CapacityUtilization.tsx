import FiterForm from '../../../components/FiterForm';
import ReportTable from '../../../components/ReportTable';
import mockCapacityUtilization from '../../../mockData/report/CapacityUtilization';
import { ICapacityUtilization } from '../../../types/capacityUtilization';
import { ColumnDefinition } from '../../../components/ReportTable';
import ReportHeading from '../../../components/ReportHeading';

const columns: ColumnDefinition<ICapacityUtilization>[] = [
  { key: 'mheNumber', header: 'MHE Number', width: 200 },
  { key: 'imeiNumber', header: 'IMEI Number', width: 200 },
  { key: 'ignitionOn', header: 'Ignition On', width: 200 },
  { key: 'ignitionOff', header: 'Ignition Off', width: 200 },
  { key: 'loadDuration', header: 'With Load Duration', width: 200 },
  { key: 'withoutLoadDuration', header: 'Without Load Duration', width: 200 },
  {
    key: 'forkMovementWithLoad',
    header: 'Fork Movement With Load',
    width: 200,
  },
  {
    key: 'forkMovementWithoutLoad',
    header: 'Fork Movement Without Load',
    width: 200,
  },
  { key: 'distanceWithLoad', header: 'Distance With Load', width: 200 },
  { key: 'distanceWithoutLoad', header: 'Distance Without Load', width: 200 },
  { key: 'fromDateTime', header: 'From Date & Time', width: 200 },
  { key: 'toDateTime', header: 'To Date & time', width: 200 },
];

const heading = [
  { key: 'Total Duration: ', value: '23:59:59' },
  { key: 'Total Load Duration: ', value: '16:39:48' },
  { key: 'Total Without Load Duration: ', value: '00:00:00' },
  { key: 'Total Running Duration: ', value: '00:02:48' },
  { key: 'Total Fork Movement With Load: ', value: '00:02:48' },
  { key: 'Total Fork Movement Without Load: ', value: '00:02:48' },
  { key: 'Total Fork Movement Duration: ', value: '00:02:48' },
  { key: 'Total Distance With Load (Mtr): ', value: 0 },
  { key: 'Total Distance Without Load (Mtr): ', value: 0 },
  { key: 'Total Distance(Mtr): ', value: 0 },
  { key: 'Total Ignition On Time: ', value: 0 },
  { key: 'Total Ignition Off Time: ', value: 0 },
  { key: 'Total MHE: ', value: 13 },
];

export default function CapacityUtilizationReport() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            Capacity Utilization Report
          </span>
        </div>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          <FiterForm />
          <ReportHeading data={heading} />;
          <ReportTable<ICapacityUtilization>
            data={mockCapacityUtilization}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
}
