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
      homeUrl: config.homeUrl,
      clientId: config.clientId,
      servers: [],
    }
    if (!ensureAuth(request)) return response.json(allowedConfig);

    // Logged in users may have access to server configs
    const allowedServers = []
    for (const serverConfig of config.servers) {
      try {
        const guild = await this.container.client.guilds.fetch(serverConfig.guildId);
        const member = await guild?.members.fetch(request.auth!.id);
  
        const isOwner = member.user.id == config.ownerUserId;
        const isAdmin = member.permissions.has(PermissionFlagsBits.Administrator);
        const isManager = member?.roles.cache.some(role => role.name == serverConfig.managerRole);
        if (isOwner || isAdmin || isManager) {
          allowedServers.push(serverConfig)
        }
      } catch(err) {
        this.container.logger.error(`Unable to validate user against server config, guildId = '${serverConfig.guildId}'\n${JSON.stringify(err)}`)
      }
    }

    allowedConfig.servers = allowedServers;
    response.json(allowedConfig);
  }
}