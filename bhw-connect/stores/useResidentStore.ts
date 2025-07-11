import { create } from "zustand";
import { Resident } from "../types/residentType";
import axiosInstance from "@/services/axiosInstance";

type ResidentStore = {
  residents: Resident[];
  fetchResidents: (areaId: string) => Promise<void>;
  setResidents: (residents: Resident[]) => void;
  addResident: (resident: Resident) => void;
  removeResident: (id: string) => void;
  updateResident: (updatedResident: Resident) => void;
};

export const useResidentStore = create<ResidentStore>((set) => ({
  residents: [],

  fetchResidents: async (areaId) => {
    try {
      const res = await axiosInstance.get(`/residents/area/${areaId}`);
      set({ residents: res.data.residents });
    } catch (error) {
      console.error("Failed to fetch residents:", error);
    }
  },
  setResidents: (residents) => set({ residents }),
  addResident: (resident) =>
    set((state) => ({
      residents: [...state.residents, resident],
    })),
  removeResident: (id) =>
    set((state) => ({
      residents: state.residents.filter((r) => r._id !== id),
    })),
  updateResident: (updatedResident) =>
    set((state) => {
      if (!updatedResident?._id) return {};
      return {
        residents: state.residents.map((r) =>
          r._id === updatedResident._id ? updatedResident : r
        ),
      };
    }), 
}));
