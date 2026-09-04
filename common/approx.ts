
export interface Message {
    id: string,
    channelId: string,
    guildId: string,
    author: {id: string},
    content: string,
    createdTimestamp: number,
}

export interface Role {
    name: string,
    hexColor: string,
}

export function stripRole(role: Role): Role {
    const {name, hexColor} = role
    return {name, hexColor}
}