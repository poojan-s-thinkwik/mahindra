import FiterForm from '../../../components/FiterForm';
import ReportTable from '../../../components/ReportTable';
import mockStartupLosses from '../../../mockData/report/StartupLosses';
import { IStartupLosses } from '../../../types/startupLosses';
import { ColumnDefinition } from '../../../components/ReportTable';
import ReportHeading from '../../../components/ReportHeading';

const columns: ColumnDefinition<IStartupLosses>[] = [
  { key: 'mheNumber', header: 'MHE Number', width: 200 },
  { key: 'imeiNumber', header: 'IMEI Number', width: 200 },
  { key: 'lossTime', header: 'Loss Time', width: 200 },
  {
    key: 'actualShiftStartTime',
    header: 'Actual Shift Start Time',
    width: 200,
  },
  {
    key: 'scheduledShiftStartTime',
    header: 'Scheduled Shift Start Time',
    width: 200,
  },
];

const heading = [
  { key: 'Total Duration: ', value: '23:59:59' },
  { key: 'Startup Losses (Hours): ', value: '16:39:48' },
  { key: 'Total MHE: ', value: 13 },
];

export default function StartupLossesReport() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            Startup Losses Report
          </span>
        </div>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4">
          <FiterForm />
          <ReportHeading data={heading} />;
          <ReportTable<IStartupLosses>
            data={mockStartupLosses}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
}
