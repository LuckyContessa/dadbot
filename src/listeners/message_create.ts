import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener } from "@sapphire/framework";
import { DefaultUserAgentAppendix, GatewayDispatchEvents, type GatewayMessageCreateDispatch } from "discord.js";
import { saveMessage } from "../data.ts";

@ApplyOptions<Listener.Options>(({ container }) => ({
    emitter: container.client.ws,
    event: GatewayDispatchEvents.MessageCreate,
}))
export class MessageCreateListener extends Listener {
    public run(data: GatewayMessageCreateDispatch["d"]) {
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
