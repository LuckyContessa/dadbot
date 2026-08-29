import { GatewayDispatchEvents, GatewayMessageReactionAddDispatch } from "discord.js";
import { Listener } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { getServerConfig } from "../config.ts";


@ApplyOptions<Listener.Options>(({ container }) => ({
    emitter: container.client.ws,
    event: GatewayDispatchEvents.MessageReactionAdd,
}))
export class MessageReactionReactionRoleListener extends Listener {
    public async run(data: GatewayMessageReactionAddDispatch["d"]) {
        const logger = this.container.logger;
        const client = this.container.client;

        logger.debug(`REACT: ${JSON.stringify(data)}`);
        if (data.member?.user.bot || !data.guild_id) {
            return
        }

        const reactionRoleSource = getServerConfig(data.guild_id)
                ?.reactionRoles
                ?.sources
                ?.find(s => s.messageId == data.message_id && s.reaction == data.emoji.name);
        if (!reactionRoleSource) {
            logger.debug('This reaction was not to a message that grants a role.')
            return
        }

        const guild = await client.guilds.fetch(data.guild_id)
        const member = await guild.members.fetch(data.user_id)
        const role = guild?.roles.cache.find(r => r.name == reactionRoleSource.role)
        if (!role) {
            logger.error(`Check config, role '${reactionRoleSource.role}' does not exist`)
            return
        }
        logger.info(`Granting role ${role.name} to ${member.displayName}`)

        await member.roles.add(role)
    }
}