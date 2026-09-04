import Database from "better-sqlite3";
import { Message } from "@dadbot/common";

const db = Database("../data/data.db")

export interface DbMessage {
    id?: number,
    discord_id: string,
    channel_id: string,
    server_id: string,
    author: string,
    content: string,
    timestamp: number,
}
db.prepare(`CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY ASC, 
    discord_id TEXT, 
    channel_id TEXT, 
    server_id TEXT, 
    author TEXT, 
    content TEXT, 
    timestamp NUMERIC
);`).run();
db.prepare(`CREATE INDEX IF NOT EXISTS messages_id_index ON messages (id)`)

function fromDbMessage(msg: DbMessage): Message {
    return {
        id: msg.discord_id,
        channelId: msg.channel_id,
        guildId: msg.server_id,
        author: {id: msg.author},
        content: msg.content,
        createdTimestamp: msg.timestamp
    }
}
function toDbMessage(msg: Message): DbMessage {
    return {
        discord_id: msg.id,
        channel_id: msg.channelId,
        server_id: msg.guildId,
        author: msg.author.id,
        content: msg.content,
        timestamp: msg.createdTimestamp
    }
}

// TODO: Sweep older messages

const getMessageStatement = db.prepare("SELECT * FROM messages WHERE discord_id = ?");
export function getMessage(discordId: string): Message {
    return fromDbMessage(getMessageStatement.get(discordId));
}

const updateMessageStatement = db.prepare("UPDATE messages SET content = $content, timestamp = $timestamp WHERE discord_id = $discord_id")
export function updateMessage(msg: Message) {
    updateMessageStatement.run(toDbMessage(msg));
}

const insertMessageStatement = db.prepare("INSERT INTO messages (discord_id, channel_id, server_id, author, content, timestamp) VALUES ($discord_id, $channel_id, $server_id, $author, $content, $timestamp)")
export function saveMessage(msg: Message) {
    insertMessageStatement.run(toDbMessage(msg));
}