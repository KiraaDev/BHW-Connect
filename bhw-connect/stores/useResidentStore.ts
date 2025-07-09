import { create } from 'zustand';
import { Resident } from '../types/residentType';

type ResidentStore = {
  residents: Resident[];
  setResidents: (residents: Resident[]) => void;
  addResident: (resident: Resident) => void;
  removeResident: (id: string) => void;
  updateResident: (updatedResident: Resident) => void;
};

export const useResidentStore = create<ResidentStore>((set) => ({
  residents: [],
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
    set((state) => ({
      residents: state.residents.map((r) =>
        r._id === updatedResident._id ? updatedResident : r
      ),
    })),
}));
