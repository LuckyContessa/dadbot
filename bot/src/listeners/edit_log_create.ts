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
                discord_id: data.id,
                channel_id: data.channel_id,
                server_id: data.guild_id,
                author: data.author.id,
                content: data.content,
                timestamp: Date.parse(data.timestamp),
            })
        }
    }
}