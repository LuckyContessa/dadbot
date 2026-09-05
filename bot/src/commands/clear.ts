import { Command } from "@sapphire/framework";
import { getConfig } from "../config.ts";
import { EmbedBuilder, MessageFlags, PermissionsBitField } from "discord.js";


export class ClearCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: "clear",
      description: "Purge the most recent messages from a channel"
    });
  }
  
  public override registerApplicationCommands(registry: Command.Registry) {
    const guildIds = getConfig().servers.map(s => s.guildId);

    registry.registerChatInputCommand((builder) => {
      builder.setName(this.name)
      .setDescription(this.description)
      .addNumberOption(o => o.setName("amount")
          .setDescription("Number of messages the bot should purge")
          .setRequired(true))
    }, {"idHints": [], guildIds})
  }
  
  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const member = await interaction.guild?.members.fetch(interaction.user.id);
    const guild = await interaction.guild?.fetch();
    const channel = await guild?.channels.fetch(interaction.channelId);
    if (channel?.isTextBased() && member?.permissionsIn(channel).has(PermissionsBitField.Flags.ManageMessages)) {
      const amount = interaction.options.getNumber("amount", true)
      const msgs = await channel.bulkDelete(amount)
      interaction.reply({content:"Done!", flags: MessageFlags.Ephemeral})

      const config = getConfig().servers.find(s => s.guildId == guild?.id)
      if (config?.editLog) {
        const editLogChannel = await this.container.client.channels.fetch(config.editLog.editLogChannelId)
        const summary = msgs.reverse().map(m => `${m?.author?.displayName}: ${m?.content}`).join("\n")
        const embed = new EmbedBuilder()
                    .setColor(0xff0000)
                    .setAuthor({name: "Messages Cleared", url: channel.url})
                    .setDescription(summary)
                    .setFooter({text: `Cleared by ${interaction.user.displayName}`})
                    .setTimestamp(new Date());
        
                if (editLogChannel?.isSendable()) {
                    await editLogChannel.send({embeds: [embed]});
                }
      }
    } else {
      interaction.reply({content:"You don't have permission to delete these messages!", flags: MessageFlags.Ephemeral})
    }
  }
}