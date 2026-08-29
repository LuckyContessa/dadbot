
/** Top level config object, stored in a config.yml */
export interface Config {
    /** Secret discord bot token */
    botToken: string,
    /** Secret discord clientId */
    clientId: string,
    /** Secret discord client secret */
    clientSecret: string,
    /** Per-server configuration */
    servers: ServerConfig[]
}

/** Per-server configuration */
export interface ServerConfig {
    /** The discord guildId, right click > copy server info */
    guildId: string,
    /** String name for the role determining who can change settings */
    managerRole: string,
    /** Settings for edit tracking */
    editLog?: EditLogConfig,
    /** Settings for reaction roles */
    reactionRoles?: ReactionRolesConfig
}

/** Settings for edit tracking */
export interface EditLogConfig {
    /** The channelId where notifications will appear, right click > copy channel id */
    editLogChannelId?: string,
}

/** Settings for reaction roles */
export interface ReactionRolesConfig {
    /** A source of roles, I guess */
    sources?: ReactionRoleSource[]
}

/** A source of roles, I guess */
export interface ReactionRoleSource{
    /** The message on which one must react */
    messageId: string,
    /** The reaction that will result in a role */
    reaction: string,
    /** The role that will be assigned */
    role: string
}