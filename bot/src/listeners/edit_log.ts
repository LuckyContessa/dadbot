import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import { EmbedBuilder, GatewayDispatchEvents, MessagePayload, type GatewayMessageCreateDispatch, type GatewayMessageDeleteDispatch, type GatewayMessageUpdateDispatch } from "discord.js";
import { getMessage, saveMessage, updateMessage } from "../data.ts";
import { editLogChannelId } from "../constants.ts";

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
