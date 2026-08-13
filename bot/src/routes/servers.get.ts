import { HttpCodes, Route } from '@sapphire/plugin-api';
import { ensureAuth } from '../api_utils.ts';
import { getConfig } from '../config.ts';
import { PermissionFlagsBits } from 'discord.js';


export class GetServersRoute extends Route {
  public async run(request: Route.Request, response: Route.Response) {
    if (!ensureAuth(request)) return response.error(HttpCodes.Unauthorized);

    const managedServers = []
    for (var s of getConfig().servers) {
      const guild = await this.container.client.guilds.fetch(s.guildId);
      const member = await guild?.members.fetch(request.auth!.id);

      const isAdmin = member.permissions.has(PermissionFlagsBits.Administrator);
      const isManager = member?.roles.cache.some(role => role.name == s.managerRole);
      if (isAdmin || isManager) {
        managedServers.push(s)
      }
    }

    response.json(managedServers);
  }
}