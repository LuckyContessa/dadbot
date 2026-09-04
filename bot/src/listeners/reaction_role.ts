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
        if (data.member?.user.bot || !data.guild_id || !data.emoji.name) {
            return
        }

        const reactionRoleSources = getServerConfig(data.guild_id)
                ?.reactionRoles
                ?.sources;
        const reactionRoleSource = reactionRoleSources?.find(s => s.messageId == data.message_id);
        if (!reactionRoleSource) {
            logger.debug('This reaction was not to a message that grants a role.')
            return
        }

        const roleName = reactionRoleSource.roles[data.emoji.name];
        if (!roleName) {
            logger.debug('This reaction does not grant the member a role.');;
            return
        }

        const guild = await client.guilds.fetch(data.guild_id)
        const member = await guild.members.fetch(data.user_id)
        const role = guild?.roles.cache.find(r => r.name == roleName)
        if (!role) {
            logger.error(`Check config, role '${roleName}' does not exist`)
            return
        }
        logger.info(`Granting role ${role.name} to ${member.displayName}`)

        await member.roles.add(role)
    }
}