import { HttpCodes, Route, RouteOptions } from '@sapphire/plugin-api';
import { ensureAuth } from '../api_utils.ts';
import { ApplyOptions } from "@sapphire/decorators";
import { stripRole } from "@dadbot/common";

@ApplyOptions<RouteOptions>({ route: '/roles/[guildId]', methods: ['GET']})
export class GetRolesRoute extends Route {
  public async run(request: Route.Request, response: Route.Response) {
    if (!ensureAuth(request)) return response.error(HttpCodes.Unauthorized, "You need to log in first");

    const guildId: string = request.params.guildId;

    if (!guildId) {
        return response.error(HttpCodes.BadRequest, "You must provide guildId");
    }

    const guild = await this.container.client.guilds.fetch(guildId);
    if (!await guild.members.fetch(request.auth!.id)) {
      return response.error(HttpCodes.Unauthorized, "You are not a member of this guild");
    }

    const roles = guild.roles.cache.map(r => stripRole(r))
    return response.json({roles})
  }
}