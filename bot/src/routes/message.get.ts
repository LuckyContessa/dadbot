import { HttpCodes, Route, RouteOptions } from '@sapphire/plugin-api';
import { ensureAuth } from '../api_utils.ts';
import { ApplyOptions } from "@sapphire/decorators";
import { getMessage, saveMessage } from "../database.ts";
import { Message } from "@dadbot/common";

@ApplyOptions<RouteOptions>({ route: '/message/[guildId]/[channelId]/[messageId]', methods: ['GET']})
export class GetMessageRoute extends Route {
  public async run(request: Route.Request, response: Route.Response) {
    if (!ensureAuth(request)) return response.error(HttpCodes.Unauthorized, "You need to log in first");

    const { guildId, channelId, messageId } = request.params as { guildId: string, channelId: string, messageId: string };

    if (!guildId || !channelId || !messageId) {
        return response.error(HttpCodes.BadRequest, "You must provide guildId, channelId, and messageId");
    }

    const guild = await this.container.client.guilds.fetch(guildId);
    if (!await guild.members.fetch(request.auth!.id)) {
      return response.error(HttpCodes.Unauthorized, "You are not a member of this guild");
    }

    const message = getMessage(messageId);
    if (message) {
      return response.json({message: message})
    }

    const channel = await guild.channels.fetch(channelId);
    if (!channel?.isTextBased()) {
      return response.error(HttpCodes.BadRequest, "This channel has no messages");
    }
    // This is dumb
    // deno-lint-ignore no-explicit-any
    const discord_message = await channel.messages.fetch(messageId) as any as Message;
    saveMessage(discord_message)
    
    return response.json({message: getMessage(messageId)})
  }
}