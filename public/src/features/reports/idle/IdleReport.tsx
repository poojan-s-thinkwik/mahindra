import FiterForm from '../../../components/FiterForm';
import ReportTable from '../../../components/ReportTable';
import mockIdleReport from '../../../mockData/report/Idle';
import { IIdleReport } from '../../../types/IdleReport';
import { ColumnDefinition } from '../../../components/ReportTable';
import ReportHeading from '../../../components/ReportHeading';

const columns: ColumnDefinition<IIdleReport>[] = [
  { key: 'mheNumber', header: 'MHE Number', width: 200 },
  { key: 'imeiNumber', header: 'IMEI Number', width: 200 },
  { key: 'idleWithLoad', header: 'Idle With Load', width: 200 },
  { key: 'idleWithoutLoad', header: 'Idle Without Load', width: 200 },
  { key: 'totalIdleDuration', header: 'Total Idle Duration', width: 200 },
];

const heading = [
  { key: 'Total Duration: ', value: '23:59:59' },
  { key: 'Total Idle Duration: ', value: '16:39:48' },
  { key: 'Total Duration With Load: ', value: '00:00:00' },
  { key: 'Total Duration Without Load: ', value: '00:02:48' },
  { key: 'Total MHE: ', value: 13 },
];

export default function IdleReport() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            Idle Report
          </span>
        </div>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          <FiterForm />
          <ReportHeading data={heading} />;
          <ReportTable<IIdleReport> data={mockIdleReport} columns={columns} />
        </div>
      </div>
    </>
  );
}
