import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "@/lib/api";
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  ApiUser,
  User,
} from "@/types/api";
import { mapApiUserToUser } from "@/types/api";

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        const response = await api.post<ApiResponse<LoginResponse>>(
          "/auth/login",
          { email, password }
        );
        const { token } = response.data.data;

        // Set the token first
        set({ token });

        // Clear any existing user data from the data store
        const { useDataStore } = await import("./data-store");
        useDataStore.getState().clearUserData();

        // Wait for the profile to be fetched before considering login complete
        await get().checkAuth();
      },

      logout: () => {
        // Clear user data from data store as well
        const { useDataStore } = require("./data-store");
        useDataStore.getState().clearUserData();

        // Clear the authorization header
        delete api.defaults.headers.common["Authorization"];

        set({ user: null, token: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        const token = get().token;
        if (!token) {
          return set({ user: null, isAuthenticated: false });
        }

        try {
          // Set the Authorization header for this specific request
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const response = await api.get<ApiResponse<ApiUser>>("/auth/profile");
          const apiUser = response.data.data;

          // Map API user to frontend user interface
          const user = mapApiUserToUser(apiUser);

          set({ user, isAuthenticated: true });
        } catch (error) {
          console.error("Auth check failed", error);
          set({ user: null, token: null, isAuthenticated: false });
          delete api.defaults.headers.common["Authorization"];
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${state.token}`;
          // Check auth status after rehydration
          state.checkAuth();
        }
      },
    }
  )
);

// Initialize the authorization header on app load if the token exists
const store = useUserStore.getState();
if (store.token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${store.token}`;
  // Check auth status on initialization
  store.checkAuth();
}
