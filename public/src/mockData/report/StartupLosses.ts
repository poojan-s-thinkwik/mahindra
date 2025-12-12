import { IStartupLosses } from '../../types/startupLosses';

const mockStartupLosses: IStartupLosses[] = [
  {
    id: 1,
    mheNumber: 'MHE-00001',
    imeiNumber: 'IMEI-00001',
    lossTime: '2023-08-01 10:00:00',
    actualShiftStartTime: '2023-08-01 08:00:00',
    scheduledShiftStartTime: '2023-08-01 08:00:00',
  },
  {
    id: 2,
    mheNumber: 'MHE-00002',
    imeiNumber: 'IMEI-00002',
    lossTime: '2023-08-02 10:00:00',
    actualShiftStartTime: '2023-08-02 08:00:00',
    scheduledShiftStartTime: '2023-08-02 08:00:00',
  },
  {
    id: 3,
    mheNumber: 'MHE-00003',
    imeiNumber: 'IMEI-00003',
    lossTime: '2023-08-03 10:00:00',
    actualShiftStartTime: '2023-08-03 08:00:00',
    scheduledShiftStartTime: '2023-08-03 08:00:00',
  },
  {
    id: 4,
    mheNumber: 'MHE-00004',
    imeiNumber: 'IMEI-00004',
    lossTime: '2023-08-04 10:00:00',
    actualShiftStartTime: '2023-08-04 08:00:00',
    scheduledShiftStartTime: '2023-08-04 08:00:00',
  },
  {
    id: 5,
    mheNumber: 'MHE-00005',
    imeiNumber: 'IMEI-00005',
    lossTime: '2023-08-05 10:00:00',
    actualShiftStartTime: '2023-08-05 08:00:00',
    scheduledShiftStartTime: '2023-08-05 08:00:00',
  },
];

export default mockStartupLosses;
