export interface ICapacityUtilization {
  id: number;
  mheNumber: string;
  imeiNumber: string;
  ignitionOn: string;
  ignitionOff: string;
  loadDuration: string;
  withoutLoadDuration: string;
  forkMovementWithLoad: string;
  forkMovementWithoutLoad: string;
  distanceWithLoad: string;
  distanceWithoutLoad: string;
  fromDateTime: string;
  toDateTime: string;
}
