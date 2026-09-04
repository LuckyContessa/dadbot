import { Command } from "@sapphire/framework";
import { isMessageInstance, isTextBasedChannel } from "@sapphire/discord.js-utilities";
import { MessageFlags, type Message } from "discord.js";
import { getConfig } from "../config.ts";

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
    const guildIds = getConfig().servers.map(s => s.guildId);

    registry.registerChatInputCommand((builder) => {
      builder.setName(this.name)
        .setDescription(this.description)
    }, {"idHints": [], guildIds})
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

  //@ts-ignore: TODO: Fix weird deno type errors
  public override async messageRun(message: Message) {
    //@ts-ignore: TODO: Fix weird deno type errors
    if (isTextBasedChannel(message.channel)) {
      const msg = await message.channel.send("Ping?");
      const diff = msg.createdTimestamp - message.createdTimestamp;
      const content = `Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${diff}ms.`;
  
      return msg.edit(content);
    }
  }
}