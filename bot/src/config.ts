import * as fs from 'node:fs';
import * as YAML from 'yaml';
import type { Config, ServerConfig } from '@dadbot/common';

export function getConfig() {
    const configStr = fs.readFileSync("../data/config.yml", "utf-8");
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
    fs.writeFileSync("../data/config.yml", configStr, "utf-8");
}
