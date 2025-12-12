export interface ICluster {
  id: number;
  name: string;
  tenantId?: number;
  tenantName: string;
  locations: [];
  status?: boolean;
}
