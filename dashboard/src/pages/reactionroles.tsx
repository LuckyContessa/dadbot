import { Alert, Blockquote, Container, Group, Loader, Select, TextInput, Typography } from "@mantine/core";
import { useConfig } from "../state/config.ts";
import type { ReactionRoleSource } from "@dadbot/common";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useDiscord } from "../state/discord.ts";


export function ReactionRoleSource({source}: {source: ReactionRoleSource}) {
    const activeServerId = useConfig(c => c.activeServerId)
    const message = useDiscord(d => d.messageCache[source.messageId])
    const serverRoles = useDiscord(d => d.rolesCache[activeServerId || "unknown"])
    const messageUrl = `discord://discordapp.com/channels/${activeServerId}/${source.channelId}/${source.messageId}`

    // These kick off promises to load the state asynchronously if not present
    const {loadMessage, loadRoles} = useDiscord();
    useEffect(() => {
        if (activeServerId) {
            loadMessage(activeServerId, source.channelId, source.messageId)
            loadRoles(activeServerId)
        }
    }, [activeServerId])

    if (!message) {
        return <Loader/>
    }

    return <>
        <Blockquote cite={<a href={messageUrl}>(go to message)</a>}>{message?.content || "(loading...)"}</Blockquote>
        {Object.keys(source.roles).map(reaction => (
            <Group key={reaction}>
                <TextInput placeholder="😂 / lolsob" value={reaction} readOnly/>
                <Select placeholder="Pick a role" data={serverRoles?.map((r) => r.name)} value={source.roles[reaction]} readOnly/>
            </Group>
        ))}
    </>
}

export function ReactionRoles() {
    const serverConfig = useConfig(c => c.servers.find(s => s.guildId == c.activeServerId));
    const rawSources = serverConfig?.reactionRoles?.sources;

    useEffect(() => {

    }, [rawSources]);

    return <Container>
        <Typography>
            <h1>Reaction Roles</h1>
            <p>
                Reaction roles are a way for members to assign server roles to 
                themselves by adding a reaction to a message. Messages typically 
                go something like "React with a 👍🏻 if you agree to the rules".
            </p>
            <hr/>
            {!serverConfig && <Loader/>}
            {rawSources && rawSources.map(source => 
                <ReactionRoleSource key={source.messageId} source={source}/>
            )}
            {serverConfig && !rawSources && <Alert color="yellow" title="There's nothing here!" icon={<Search />}>You don't have any reaction roles set up.</Alert>}
        </Typography>
    </Container>
}