import { Route } from '@sapphire/plugin-api';
import { ensureAuth } from '../api_utils.ts';
import { getConfig } from '../config.ts';
import { PermissionFlagsBits } from 'discord.js';
import { Config } from "@dadbot/common";


export class GetConfigRoute extends Route {
  public async run(request: Route.Request, response: Route.Response) {
    const config = getConfig()

    // The frontend is not allowed to read backend secrets.
    // We'll send them general config though.
    const allowedConfig: Config = {
      devMode: config.devMode,
      clientId: config.clientId,
      servers: [],
    }
    if (!ensureAuth(request)) return response.json(allowedConfig);

    // Logged in users may have access to server configs
    const allowedServers = []
    for (const serverConfig of config.servers) {
      const guild = await this.container.client.guilds.fetch(serverConfig.guildId);
      const member = await guild?.members.fetch(request.auth!.id);

      const isAdmin = member.permissions.has(PermissionFlagsBits.Administrator);
      const isManager = member?.roles.cache.some(role => role.name == serverConfig.managerRole);
      if (isAdmin || isManager) {
        allowedServers.push(serverConfig)
      }
    }

    allowedConfig.servers = allowedServers;
    response.json(allowedConfig);
  }
}