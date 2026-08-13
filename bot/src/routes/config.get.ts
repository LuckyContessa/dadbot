import { HttpCodes, Route } from '@sapphire/plugin-api';
import { ensureAuth } from '../api_utils.ts';
import { getConfig } from '../config.ts';
import { PermissionFlagsBits } from 'discord.js';


export class GetConfigRoute extends Route {
  public async run(request: Route.Request, response: Route.Response) {
    if (!ensureAuth(request)) return response.error(HttpCodes.Unauthorized);

    const managedServers = []
    for (var config of getConfig().servers) {
      const guild = await this.container.client.guilds.fetch(config.guildId);
      const member = await guild?.members.fetch(request.auth!.id);

      const isAdmin = member.permissions.has(PermissionFlagsBits.Administrator);
      const isManager = member?.roles.cache.some(role => role.name == config.managerRole);
      if (isAdmin || isManager) {
        managedServers.push(config)
      }
    }

    response.json(managedServers);
  }
}