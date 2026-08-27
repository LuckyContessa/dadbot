import "dotenv/config"
import { LogLevel, SapphireClient } from "@sapphire/framework";
import '@sapphire/plugin-api/register'; // Adds `api` field to SapphireClientOptions
import { GatewayIntentBits, OAuth2Scopes } from "discord.js";
import { getConfig } from "./config.ts";

const config = getConfig();
const dev = !!process.env['DEV']
if (dev) {
    console.log("DEVELOPMENT MODE DETECTED")
}

const client = new SapphireClient({
    api: {
        auth: {
            id: config.clientId,
            secret: config.clientSecret,
            cookie: 'DADBOT_AUTH',
            scopes: [OAuth2Scopes.Identify, OAuth2Scopes.Guilds],
            redirect: process.env['DEV'] ? "http://127.0.0.1:5173" : undefined,
            domainOverwrite: process.env['DEV'] ? '127.0.0.1' : undefined
        },
        prefix: '/api',
        listenOptions: {
            port: 8013,
        },
    },
    logger: { level: LogLevel.Info },
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