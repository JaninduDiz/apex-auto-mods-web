import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string; // Optional avatar
  bio?: string;
  followers?: number;
  following?: number;
}

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
        const response = await api.post("/auth/login", { email, password });
        const { token } = response.data.data; // Fixed: API returns token in data.data.token

        // Set the token first
        set({ token });
        console.log("token", token);
        // Wait for the profile to be fetched before considering login complete
        await get().checkAuth();
      },

      logout: () => {
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

          const response = await api.get("/auth/profile");
          const userData = response.data.data; // Fixed: API returns user in data.data

          // Map API response to our user interface
          const user = {
            _id: userData._id || userData.id, // Handle both _id and id
            name: userData.username || userData.name, // Handle both username and name
            email: userData.email,
            avatarUrl: userData.avatarUrl || "https://placehold.co/128x128.png",
            bio:
              userData.bio ||
              "Car enthusiast and professional modifier. Passionate about creating unique and high-performance vehicles.",
            followers: userData.followers || 1250,
            following: userData.following || 340,
          };

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
