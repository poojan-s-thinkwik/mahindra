import { IOverspeed } from '../../types/overspeed';

const mockOverspeed: IOverspeed[] = [
  {
    mheNumber: 'MHE-00001',
    imeiNumber: 'IMEI-00001',
    noOfTimesOverspeed: 5,
    fromDateTime: '2022-01-01 00:00:00',
    toDateTime: '2022-01-01 23:59:59',
  },
  {
    mheNumber: 'MHE-00002',
    imeiNumber: 'IMEI-00002',
    noOfTimesOverspeed: 3,
    fromDateTime: '2022-01-02 00:00:00',
    toDateTime: '2022-01-02 23:59:59',
  },
  {
    mheNumber: 'MHE-00003',
    imeiNumber: 'IMEI-00003',
    noOfTimesOverspeed: 7,
    fromDateTime: '2022-01-03 00:00:00',
    toDateTime: '2022-01-03 23:59:59',
  },
  {
    mheNumber: 'MHE-00004',
    imeiNumber: 'IMEI-00004',
    noOfTimesOverspeed: 2,
    fromDateTime: '2022-01-04 00:00:00',
    toDateTime: '2022-01-04 23:59:59',
  },
  {
    mheNumber: 'MHE-00005',
    imeiNumber: 'IMEI-00005',
    noOfTimesOverspeed: 4,
    fromDateTime: '2022-01-05 00:00:00',
    toDateTime: '2022-01-05 23:59:59',
  },
];

export default mockOverspeed;
