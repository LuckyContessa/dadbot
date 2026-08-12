import * as fs from 'fs';
import * as YAML from 'yaml';


export interface ServerConfig {
    guildId: string,
    editLogChannelId?: string,
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

export function saveConfig(config: Config) {
    const configStr = YAML.stringify(config);
    fs.writeFileSync("../config.yml", configStr, "utf-8");
}


export function getEditLogChannel(serverId: string | undefined): string | undefined {
    if (!serverId) {
        return;
    }

    const config = getConfig();
    const serverConfig = config.servers.find(s => s.guildId == serverId);

    return serverConfig?.editLogChannelId;
}
