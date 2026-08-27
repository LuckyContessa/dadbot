
export interface EditLogConfig {
    editLogChannelId?: string,
}

export interface ServerConfig {
    guildId: string,
    managerRole: string,
    editLog?: EditLogConfig,
}

export interface Config {
    botToken: string,
    clientId: string,
    clientSecret: string,
    servers: ServerConfig[]
}