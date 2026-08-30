// TODO: Actually log events and show it on the dashboard, this is just a sketch
export type EventType = 
    "command" | 
    "message_edit" | 
    "message_delete" | 
    "reaction_role";

export interface Event {
    id?: number
    guildId: string,
    timestamp: number,
    type: EventType,
    detail: string,
}
