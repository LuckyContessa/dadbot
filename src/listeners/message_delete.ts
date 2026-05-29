import { ApplyOptions } from "@sapphire/decorators";
import { Events, Listener } from "@sapphire/framework";
import { EmbedBuilder, GatewayDispatchEvents, MessagePayload, type GatewayMessageDeleteDispatch } from "discord.js";
import { getMessage, saveMessage } from "../data.ts";
import { editLogChannelId } from "../constants.ts";

@ApplyOptions<Listener.Options>(({ container }) => ({
    emitter: container.client.ws,
    event: GatewayDispatchEvents.MessageDelete,
}))
export class MessageDeleteListener extends Listener {
    public async run(data: GatewayMessageDeleteDispatch["d"]) {
        const msg = getMessage(data.id);
        if (!msg) {
            this.container.logger.info(`A message was deleted, but we don't have the original: ${data}`)
            return
        }

        const author = await this.container.client.users.fetch(msg.author);
        const logChannel = await this.container.client.channels.fetch(editLogChannelId);

        const embed = new EmbedBuilder()
            .setColor(0xff0000)
            .setAuthor({name: "Message Deleted", url: `https://discord.com/channels/${msg.server_id}/${msg.channel_id}`})
            .setDescription(msg.content)
            .setFooter({text: author.displayName})
            .setTimestamp(msg.timestamp);

        if (logChannel?.isSendable()) {
            await logChannel.send({embeds: [embed]});
        }
    }
}
