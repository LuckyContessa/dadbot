import { type ServerConfig } from '@dadbot/common';
import { create, type StoreApi, type UseBoundStore } from 'zustand';


interface Config {
    configs: ServerConfig[],
    activeServerId?: string, // TODO: Maybe move this somewhere else
    load: () => Promise<void>,
    setActiveServerId: (activeServer: string) => void,
    getActiveServerConfig: () => ServerConfig | undefined,
}

export const useConfig: UseBoundStore<StoreApi<Config>> = create((set, get) => ({
    configs: [],
    activeServerId: undefined,
    load: async () => {
        const response = await fetch('/api/config');
        const configs: ServerConfig[] = await response.json();
        const activeServer = configs[0]?.guildId;

        set({configs, activeServerId: activeServer})
    },
    setActiveServerId: (guildId: string) => set({activeServerId: guildId}),
    getActiveServerConfig: () => {
        const self = get();
        return self.configs.find(s => s.guildId == self.activeServerId)
    }
}));
