import "dotenv/config"
import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { botToken } from "./constants.ts";

const client = new SapphireClient({
    caseInsensitiveCommands: true,
    caseInsensitivePrefixes: true,
    defaultPrefix: "^",
    loadMessageCommandListeners: true,
    loadDefaultErrorListeners: true,
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildExpressions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessagePolls,
        GatewayIntentBits.MessageContent],
});

client.login(botToken);