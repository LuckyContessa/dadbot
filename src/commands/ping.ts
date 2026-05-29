import { Command } from "@sapphire/framework";
import { isMessageInstance, isTextBasedChannel } from "@sapphire/discord.js-utilities";
import { MessageFlags, type Message } from "discord.js";
import { guildIds } from "../constants.ts";

export class PingCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: "ping",
      aliases: ["pong"],
      description: "ping pong"
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder.setName(this.name)
        .setDescription(this.description)
    }, {"idHints": ["1509727358473605281", "1509734378388066426"], guildIds})
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const callbackResponse = await interaction.reply({
      content: "Ping?",
      withResponse: true,
      flags: MessageFlags.Ephemeral
    })
    const msg = callbackResponse.resource?.message;

    if (msg && isMessageInstance(msg)) {
      const diff = msg.createdTimestamp - interaction.createdTimestamp;
      const ping = Math.round(this.container.client.ws.ping);
      return interaction.editReply(`Pong! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`)
    }

    return interaction.editReply("Failed to retrieve ping =(");
  }

  public async messageRun(message: Message) {
    if (isTextBasedChannel(message.channel)) {
      const msg = await message.channel.send("Ping?");
      const diff = msg.createdTimestamp - message.createdTimestamp;
      const content = `Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${diff}ms.`;
  
      return msg.edit(content);
    }
  }
}