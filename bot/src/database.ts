import Database from "better-sqlite3";

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

// TODO: Sweep older messages

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