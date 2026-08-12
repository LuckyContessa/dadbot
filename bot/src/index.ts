import "dotenv/config"
import { SapphireClient } from "@sapphire/framework";
import '@sapphire/plugin-api/register'; // Adds `api` field to SapphireClientOptions
import { GatewayIntentBits, OAuth2Scopes } from "discord.js";
import { getConfig } from "./config.ts";

const config = getConfig();

const client = new SapphireClient({
    api: {
        auth: {
            id: config.clientId,
            secret: config.clientSecret,
            cookie: 'DADBOT_AUTH',
            scopes: [OAuth2Scopes.Identify, OAuth2Scopes.Guilds],
            domainOverwrite: '127.0.0.1'
        },
        listenOptions: {
            port: 3000
        }
    },
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

client.login(config.botToken);