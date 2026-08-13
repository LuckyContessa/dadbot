import { create, type StoreApi, type UseBoundStore } from 'zustand';
import type { RESTAPIPartialCurrentUserGuild, RESTGetAPICurrentUserResult } from 'discord.js';


export interface AuthState {
    user?: RESTGetAPICurrentUserResult,
    guilds: RESTAPIPartialCurrentUserGuild[],
    error?: string | null,
    load: () => Promise<void>,
    login: (code: string) => Promise<void>,
    logout: () => void,
}

export const useAuthState: UseBoundStore<StoreApi<AuthState>> = create((set) => ({
    user: undefined,
    guilds: [],
    error: null,
    load: async () => {
        const response = await fetch('/api/user');

        const loginData = await response.json();
        if (loginData.user && loginData.guilds) {
            console.log("Logged in. Data:");
            console.log(loginData);
            set({ user: loginData.user, guilds: loginData.guilds, error: null });
        } else {
            set({ user: undefined, guilds: [], error: JSON.stringify(loginData) });
        }
    },
    login: async (code: string) => {
        const response = await fetch('/api/oauth/callback', {
            method: 'POST',
            body: JSON.stringify({ code }),
            headers: { 'Content-Type': 'application/json' }
        });

        const loginData = await response.json();
        if (loginData.user && loginData.guilds) {
            console.log("Logged in. Data:");
            console.log(loginData);
            set({ user: loginData.user, guilds: loginData.guilds, error: null });
        } else {
            set({ user: undefined, guilds: [], error: JSON.stringify(loginData) });
        }
    },
    logout: async () => {
        set({ user: undefined, guilds: [], error: null });
        await fetch('/api/oauth/logout', {method: 'POST'});
    },
}))
