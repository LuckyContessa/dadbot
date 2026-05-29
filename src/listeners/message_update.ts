import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import { EmbedBuilder, GatewayDispatchEvents, type GatewayMessageUpdateDispatch } from "discord.js";
import { getMessage, saveMessage, updateMessage } from "../data.ts";
import { editLogChannelId } from "../constants.ts";

@ApplyOptions<Listener.Options>(({ container }) => ({
    emitter: container.client.ws,
    event: GatewayDispatchEvents.MessageUpdate,
}))
export class MessageUpdateListener extends Listener {
    public async run(data: GatewayMessageUpdateDispatch["d"]) {
        if (data.author.bot) {
            return
        }

        const oldMsg = getMessage(data.id);
        if (!oldMsg) {
            this.container.logger.info(`A message was updated, but we don't have the original: ${data}`)
            return
        }

        const author = await this.container.client.users.fetch(oldMsg.author);
        const logChannel = await this.container.client.channels.fetch(editLogChannelId);

        const embed = new EmbedBuilder()
            .setColor(0xffaa00)
            .setAuthor({name: "Message Edited", url: `https://discord.com/channels/${oldMsg.server_id}/${oldMsg.channel_id}/${oldMsg.discord_id}`})
            .setDescription(oldMsg.content)
            .setFooter({text: author.displayName})
            .setTimestamp(oldMsg.timestamp);

        if (logChannel?.isSendable()) {
            await logChannel.send({embeds: [embed]});
        }

        updateMessage({
            ...oldMsg,
            content: data.content,
            timestamp: Date.parse(data.timestamp),
        })
    }
}
