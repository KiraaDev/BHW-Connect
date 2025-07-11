import { create } from "zustand";
import { saveToken, getToken, removeToken } from "../utils/storage";
import axios from "../services/axiosInstance";

type AuthStore = {
  token: string | null;
  user: any | null;
  setAuth: (token: string, user: any) => void;
  clearAuth: () => void;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,

  setAuth: (token, user) => {
    saveToken(token); 
    set({ token, user });
  },

  clearAuth: () => {
    removeToken(); 
    set({ token: null, user: null });
  },

  checkAuth: async () => {
    const token = await getToken();
    if (token) {
      try {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        set({ token, user: response.data.user });
      } catch (err) {
        console.log("🔴 Invalid token:", err);
        removeToken();
        set({ token: null, user: null });
      }
    } else {
      set({ token: null, user: null });
    }
  },
}));
