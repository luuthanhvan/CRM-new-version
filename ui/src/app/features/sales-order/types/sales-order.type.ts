export type SalesOrder = {
  _id?: string;
  no?: number;
  subject: string;
  contactName: string;
  status: string;
  total: string;
  assignedTo: string;
  creator?: string;
  description: string;
  createdTime?: Date;
  updatedTime?: Date;
};
