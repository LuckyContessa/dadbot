import * as fs from 'fs';
import * as YAML from 'yaml';


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

export function getConfig() {
    const configStr = fs.readFileSync("../config.yml", "utf-8");
    const config: Config = YAML.parse(configStr);

    return config;
}

export function getServerConfig(serverId?: string): ServerConfig | undefined {
    return getConfig()
        .servers
        .find(s => s.guildId == serverId)
}

export function saveConfig(config: Config) {
    const configStr = YAML.stringify(config);
    fs.writeFileSync("../config.yml", configStr, "utf-8");
}
