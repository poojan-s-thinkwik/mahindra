import FiterForm from '../../../components/FiterForm';
import ReportTable from '../../../components/ReportTable';
import mockNewDevice from '../../../mockData/report/NewDevice';
import { INewDevice } from '../../../types/newDevice';
import { ColumnDefinition } from '../../../components/ReportTable';

const columns: ColumnDefinition<INewDevice>[] = [
  { key: 'mheNumber', header: 'MHE Number', width: 200 },
  { key: 'imeiNumber', header: 'IMEI Number', width: 200 },
];

export default function NewDeviceReport() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            New Devicd Report
          </span>
        </div>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          <FiterForm />
          <ReportTable<INewDevice> data={mockNewDevice} columns={columns} />
        </div>
      </div>
    </>
  );
}
