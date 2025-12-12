import FiterForm from '../../../components/FiterForm';
import ReportTable from '../../../components/ReportTable';
import mockDistanceTraveled from '../../../mockData/report/DistanceTraveled';
import { IDistanceTraveled } from '../../../types/distanceTraveled';
import { ColumnDefinition } from '../../../components/ReportTable';

const columns: ColumnDefinition<IDistanceTraveled>[] = [
  { key: 'mheNumber', header: 'MHE Number', width: 200 },
  { key: 'imeiNumber', header: 'IMEI Number', width: 200 },
  {
    key: 'runningDurationWithLoad',
    header: 'Running Duration With Load',
    width: 200,
  },
  {
    key: 'runningDurationWithoutLoad',
    header: 'Running Duration Without Load',
    width: 200,
  },
  { key: 'distanceWithoutLoad', header: 'Distance Without Load', width: 200 },
  { key: 'distanceWithLoad', header: 'Distance With Load', width: 200 },
  { key: 'fromDateTime', header: 'From Date & Time', width: 200 },
  { key: 'toDateTime', header: 'To Date & time', width: 200 },
];

export default function DistanceTraveledReport() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            Distance Traveled Report
          </span>
        </div>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          <FiterForm />
          <ReportTable<IDistanceTraveled>
            data={mockDistanceTraveled}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
}
