import {
Avatar,
  NavLink,
  Select,
} from '@mantine/core';
import {
  BarChart3,
  Gamepad2,
  Sparkles,
  Settings,
  Users,
  Scale,
  Logs,
  Globe,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from "../state/auth.ts";
import { useConfig } from "../state/config.ts";

interface NavItem {
  id: string,
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Overview', id: "overview", icon: <BarChart3 width={18} height={18} />, active: true },
  { label: 'Logging', id: "logging", icon: <Logs width={18} height={18} /> },
  { label: 'Games', id: "games", icon: <Gamepad2 width={18} height={18} /> },
  { label: 'Reaction Roles', id: "reactionroles", icon: <Users width={18} height={18} /> },
  { label: 'Moderation', id: "moderation", icon: <Scale width={18} height={18} /> },
  { label: 'GIFs', id: "gifs", icon: <Sparkles width={18} height={18} /> },
  { label: 'Settings', id: "settings", icon: <Settings width={18} height={18} /> },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.replace("/","");
  const tab = path == "" ? "overview" : path;

  return (
    <>
      {navItems.map((item) => {
        return <NavLink 
            key={item.id}
            onClick={() => navigate("/"+item.id)}
            label={item.label}
            leftSection={item.icon}
            active={tab == item.id}
        />;
      })}
      <ServerSelector />
    </>
  );
}

export function ServerSelector() {
  const auth = useAuth()
  const config = useConfig();

  // Only logged in users get to select a server
  if (!auth.user) {
    return
  }

  const activeGuild = auth?.guilds.find(g => g.id == config.activeServerId);
  const icon = activeGuild?.icon
    ? <Avatar size={25} radius="sm" src={`https://cdn.discordapp.com/icons/${activeGuild.id}/${activeGuild.icon}`} />
    : <Globe size={14} />

  const managedGuilds = config.servers
      .map(c => auth.guilds.find(g => g.id == c.guildId))
      .filter(g => g != undefined);

  return (
      <Select
        data={managedGuilds.map((g) => ({
          value: g.id,
          label: `${g.name}`,
        }))}
        value={config.activeServerId}
        onChange={(id) => {if (id) config.setActiveServerId(id)}}
        placeholder="Select server"
        size="sm"
        leftSection={icon}
        allowDeselect={false}
        comboboxProps={{ position: 'top' }}
        mt="auto"
      />
  )
}
