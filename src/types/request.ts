export type RequestStatus = 'New' | 'Contacted' | 'Confirmed' | 'Preparing' | 'Completed' | 'Cancelled';

export interface RequestItemSnapshot {
  productId: string;
  productName: string;
  quantity: number;
}

export interface RequestRecord {
  id: string;
  referenceNumber: string;
  customerName: string;
  phoneNumber: string;
  requestType: 'selection' | 'catering';
  selectedItems: RequestItemSnapshot[];
  occasionType?: string;
  proposedDate?: string;
  estimatedGuestCount?: number;
  requestDetails: string;
  preferredContactMethod: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}
