import { create, type StoreApi, type UseBoundStore } from 'zustand';
import type { RESTAPIPartialCurrentUserGuild, RESTGetAPICurrentUserResult } from 'discord.js';


export interface AuthState {
    user?: RESTGetAPICurrentUserResult,
    guilds: RESTAPIPartialCurrentUserGuild[],
    loggingIn: boolean,
    error?: string | null,
    login: (code: string) => Promise<void>,
    logout: () => void,
}

export const useAuthState: UseBoundStore<StoreApi<AuthState>> = create((set) => ({
    user: undefined,
    guilds: [],
    error: undefined,
    loggingIn: false,
    login: async (code: string) => {
        set({loggingIn: true})
        try {
            const response = await fetch('/api/oauth/callback', {
                method: 'POST',
                body: JSON.stringify({ code }),
                headers: { 'Content-Type': 'application/json' }
            });

            const loginData = await response.json();
            if (loginData.user && loginData.guilds) {
                set({ user: loginData.user, guilds: loginData.guilds, error: null });
            } else {
                set({ user: undefined, guilds: [], error: JSON.stringify(loginData) });
            }
        } catch (e) {
            set({ user: undefined, guilds: [], error: JSON.stringify(e) });
        }
        set({loggingIn: false})
    },
    logout: () => set({ user: undefined, guilds: [], error: null }),
}))
