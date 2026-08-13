import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import { EmbedBuilder, GatewayDispatchEvents, type GatewayMessageDeleteDispatch } from "discord.js";
import { getMessage } from "../database.ts";
import { getServerConfig } from "../config.ts";


@ApplyOptions<Listener.Options>(({ container }) => ({
    emitter: container.client.ws,
    event: GatewayDispatchEvents.MessageDelete,
}))
export class MessageDeleteEditLogListener extends Listener {
    public async run(data: GatewayMessageDeleteDispatch["d"]) {
        this.container.logger.info(`EDIT: ${data}`);
        const msg = getMessage(data.id);
        if (!msg) {
            this.container.logger.info(`A message was deleted, but we don't have the original: ${data}`);
            return
        }
        
        const editLogChannelId = getServerConfig(msg.server_id)?.editLog?.editLogChannelId;
        if (!editLogChannelId) {
            // Edit logs not enabled for this message
            this.container.logger.info(`A message was deleted, but delete logs are not enabled: ${data}`)
            return
        }

        const author = await this.container.client.users.fetch(msg.author);
        const editLogChannel = await this.container.client.channels.fetch(editLogChannelId);

        const embed = new EmbedBuilder()
            .setColor(0xff0000)
            .setAuthor({name: "Message Deleted", url: `https://discord.com/channels/${msg.server_id}/${msg.channel_id}`})
            .setDescription(msg.content)
            .setFooter({text: author.displayName})
            .setTimestamp(msg.timestamp);

        if (editLogChannel?.isSendable()) {
            await editLogChannel.send({embeds: [embed]});
        }
    }
}