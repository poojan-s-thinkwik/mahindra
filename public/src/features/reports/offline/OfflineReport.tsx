import FiterForm from '../../../components/FiterForm';
import ReportTable from '../../../components/ReportTable';
import mockOffline from '../../../mockData/report/Offline';
import { IOffline } from '../../../types/offline';
import { ColumnDefinition } from '../../../components/ReportTable';

const columns: ColumnDefinition<IOffline>[] = [
  { key: 'mheNumber', header: 'MHE Number', width: 200 },
  { key: 'imeiNumber', header: 'IMEI Number', width: 200 },
  { key: 'offlineDuration', header: 'Offline Duration', width: 200 },
  { key: 'fromDateTime', header: 'From Date & Time', width: 200 },
  { key: 'toDateTime', header: 'To Date Time', width: 200 },
];

export default function OfflineReport() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            Offline Report
          </span>
        </div>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          <FiterForm />
          <ReportTable<IOffline> data={mockOffline} columns={columns} />
        </div>
      </div>
    </>
  );
}
