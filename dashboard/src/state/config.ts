import type { Config as BotConfig, ServerConfig } from '@dadbot/common';
import { create, type StoreApi, type UseBoundStore } from 'zustand';


interface Config extends BotConfig {
    activeServerId?: string, // TODO: Maybe move this somewhere else
    load: () => Promise<void>,
    setActiveServerId: (activeServer: string) => void,
    getActiveServerConfig: () => ServerConfig | undefined,
}

export const useConfig: UseBoundStore<StoreApi<Config>> = create((set, get) => ({
    devMode: false,
    clientId: undefined,
    servers: [],
    activeServerId: undefined,
    load: async () => {
        const response = await fetch('/api/config');
        const botConfig: BotConfig = await response.json();
        const activeServer = botConfig.servers[0]?.guildId;

        set({...botConfig, activeServerId: activeServer})
    },
    setActiveServerId: (guildId: string) => set({activeServerId: guildId}),
    getActiveServerConfig: () => {
        const self = get();
        return self.servers.find(s => s.guildId == self.activeServerId)
    }
}));
