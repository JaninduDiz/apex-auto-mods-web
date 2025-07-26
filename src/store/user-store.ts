import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '@/lib/api';

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
                const response = await api.post('/auth/login', { email, password });
                const { token } = response.data;
                
                set({ token });
                
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
                    const response = await api.get('/auth/profile');
                    const user = response.data;
                    const enrichedUser = {
                        ...user,
                        avatarUrl: user.avatarUrl || "https://placehold.co/128x128.png",
                        bio: user.bio || "Car enthusiast and professional modifier. Passionate about creating unique and high-performance vehicles.",
                        followers: user.followers || 1250,
                        following: user.following || 340,
                    };

                    set({ user: enrichedUser, isAuthenticated: true });
                } catch (error) {
                    console.error("Auth check failed", error);
                    set({ user: null, token: null, isAuthenticated: false });
                }
            }
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
