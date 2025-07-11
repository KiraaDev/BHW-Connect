import axiosInstance from "@/services/axiosInstance";
import { AreaType } from "@/types/areaType";
import { create } from "zustand";

type AreaStore = {
    areas: AreaType[],
    fetchAreas: (bhwId: string) => Promise<{ areas: [] }>
}

export const useAreaStore = create<AreaStore>((set) => ({
    areas: [],

    fetchAreas: async (bhwId: string) => {
        try {
          const res = await axiosInstance.get(`/users/bhws/${bhwId}/area`);
    
          set({ areas: res.data.areas });
    
          return { areas: res.data.areas };
        } catch (error) {
          console.error("Failed to fetch areas:", error);
          return { areas: [] };
        }
      },
}))