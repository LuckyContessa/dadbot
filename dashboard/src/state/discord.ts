import { create, type StoreApi, type UseBoundStore } from 'zustand';
import type { Message, Role } from "@dadbot/common";


interface Discord {
    messageCache: Record<string, Message>,
    rolesCache: Record<string, Role[]>
    loadMessage: (guildId: string, channelId: string, messageId: string) => Promise<Message>,
    loadRoles: (guildId: string) => Promise<string[]>
}

export const useDiscord: UseBoundStore<StoreApi<Discord>> = create((set, get) => ({
    messageCache: {},
    rolesCache: {},
    loadMessage: async (guildId, channelId, messageId) => {
        const cached = get().messageCache[messageId]
        if (cached) {
            return cached
        }

        const message = await fetch(`/api/message/${guildId}/${channelId}/${messageId}`)
            .then(r => r.json())
            .then(r => r.message);
        
        set(old => ({...old, messageCache: {...old.messageCache, [messageId]: message}}));
        return message
    },
    loadRoles: async (guildId) => {
        const cached = get().rolesCache[guildId]
        if (cached) {
            return cached
        }

        const roles = await fetch(`/api/roles/${guildId}`)
            .then(r => r.json())
            .then(r => r.roles);
        
        set(old => ({...old, rolesCache: {...old.rolesCache, [guildId]: roles}}));
        return roles
    }
}));
