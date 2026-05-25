import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RequestRecord, RequestStatus } from '../types/request';

interface RequestState {
  requests: RequestRecord[];
  addRequest: (request: Omit<RequestRecord, 'id' | 'referenceNumber' | 'status' | 'createdAt' | 'updatedAt'>) => RequestRecord;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  resetRequests: () => void;
  getRequestsByStatus: (status: RequestStatus) => RequestRecord[];
}

export const useRequestStore = create<RequestState>()(
  persist(
    (set, get) => ({
      requests: [],

      addRequest: (requestData) => {
        const currentRequests = get().requests;
        const nextNumber = currentRequests.length + 1;
        const referenceNumber = `HM-REQ-${nextNumber.toString().padStart(4, '0')}`;
        
        const newRequest: RequestRecord = {
          ...requestData,
          id: crypto.randomUUID(),
          referenceNumber,
          status: 'New',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set({ requests: [newRequest, ...currentRequests] });
        return newRequest;
      },

      updateRequestStatus: (id, status) => {
        set((state) => ({
          requests: state.requests.map((req) =>
            req.id === id
              ? { ...req, status, updatedAt: new Date().toISOString() }
              : req
          ),
        }));
      },

      resetRequests: () => {
        set({ requests: [] });
      },

      getRequestsByStatus: (status) => {
        return get().requests.filter((req) => req.status === status);
      },
    }),
    {
      name: 'honeymarve-requests-storage',
    }
  )
);
