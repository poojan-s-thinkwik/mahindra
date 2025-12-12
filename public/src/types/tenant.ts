export interface ITenant {
  id: number;
  name: string;
  organizationId?: number;
  organizationName: string;
  email: string;
  contactNumber: string;
  address: string;
  status?: boolean;
}
