
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { user as mockUser } from '@/lib/constants'; // Using mock data for now

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    avatarUrl: string;
    bio: string;
    followers: number;
    following: number;
}

interface UserState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => void;
    // In a real app, you might have a function to fetch user from token
    // initialize: () => void; 
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: async (email: string, pass: string) => {
                // In a real app, you'd make an API call here.
                // const response = await fetch('/api/auth/login', { ... });
                // const data = await response.json();
                // if (!response.ok) throw new Error(data.message);

                // --- MOCK IMPLEMENTATION ---
                await new Promise(resolve => setTimeout(resolve, 500));
                // For demonstration, we'll just use the mock user.
                const token = 'mock-jwt-token';
                const user = mockUser;
                // --- END MOCK ---
                
                set({ user, token, isAuthenticated: true });
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false });
            },
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
);

