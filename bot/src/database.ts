import Database from "better-sqlite3";
import type { Message } from "discord.js";

const db = Database("../data/data.db")
// TODO: Sweep older messages

// CREATE TABLE messages(id INTEGER PRIMARY KEY ASC, discord_id TEXT, channel_id TEXT, server_id TEXT, author TEXT, content TEXT, timestamp NUMERIC);
export interface DbMessage {
    id?: number,
    discord_id: string,
    channel_id: string,
    server_id: string,
    author: string,
    content: string,
    timestamp: number,
}

const getMessageStatement = db.prepare("SELECT * FROM messages WHERE discord_id = ?");
export function getMessage(discordId: string): DbMessage {
    return getMessageStatement.get(discordId) as DbMessage;
}

const updateMessageStatement = db.prepare("UPDATE messages SET content = $content, timestamp = $timestamp WHERE discord_id = $discord_id")
export function updateMessage(msg: DbMessage) {
    updateMessageStatement.run(msg);
}

const insertMessageStatement = db.prepare("INSERT INTO messages (discord_id, channel_id, server_id, author, content, timestamp) VALUES ($discord_id, $channel_id, $server_id, $author, $content, $timestamp)")
export function saveMessage(msg: DbMessage) {
    insertMessageStatement.run(msg);
}