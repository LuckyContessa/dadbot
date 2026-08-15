import {
  NavLink,
} from '@mantine/core';
import {
  BarChart3,
  Gamepad2,
  Sparkles,
  Settings,
  Users,
  Scale,
  Logs,
} from 'lucide-react';
import { useLocation } from 'react-router';

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

  var tab = location.pathname.replace("/","");
  if (tab == "") {
    tab = "overview"
  }

  return (
    <>
      {navItems.map((item) => {
        return <NavLink 
            key={item.id}
            href={"#"+item.id}
            label={item.label}
            leftSection={item.icon}
            active={tab == item.id}
        />;
      })}
    </>
  );
}
