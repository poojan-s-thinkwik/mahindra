export interface ISite {
  id: number;
  name: string;
  tenantId?: number;
  tenantName: string;
  email: string;
  contactNumber: string;
  address: string;
  status?: boolean;
}
