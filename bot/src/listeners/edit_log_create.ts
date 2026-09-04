import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import { GatewayDispatchEvents, type GatewayMessageCreateDispatch } from "discord.js";
import { saveMessage } from "../database.ts";


@ApplyOptions<Listener.Options>(({ container }) => ({
    description: "Logs newly created messages in case they are edited/deleted later",
    emitter: container.client.ws,
    event: GatewayDispatchEvents.MessageCreate,
}))
export class MessageCreateEditLogListener extends Listener {
    public run(data: GatewayMessageCreateDispatch["d"]) {
        this.container.logger.debug(`CREATE: ${JSON.stringify(data)}`);

        if (data.author.bot) {
            return
        }

        if (data.guild_id) {
            saveMessage({
                id: data.id,
                channelId: data.channel_id,
                guildId: data.guild_id,
                author: data.author,
                content: data.content,
                createdTimestamp: Date.parse(data.timestamp),
            })
        }
    }
}