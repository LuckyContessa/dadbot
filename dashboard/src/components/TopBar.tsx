import {
  Avatar,
  Flex,
  Group,
  Menu,
  Select,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { ChevronDown, Globe, LogIn, LogOut, Settings, User } from 'lucide-react';
import React, { useCallback } from 'react';
import { useAuthState } from '../state/auth';

// Mock server list — replace with real data later
const servers = [
  { id: '1', name: 'Contessa Uneven', icon: '👑' },
  { id: '2', name: 'CODE-A...', icon: '💀' },
  { id: '3', name: 'Test Server', icon: '🧪' },
];

export function ServerSelector() {
  return (
      <Select
        data={servers.map((s) => ({
          value: s.id,
          label: `${s.icon} ${s.name}`,
        }))}
        placeholder="Select server"
        size="sm"
        leftSection={<Globe size={14} />}
        allowDeselect={false}
      />
  )
}

export function UserMenu() {
  const authState = useAuthState()
  const user = authState.user;

  const login = useCallback(() => {
    const oauthURL = new URL("https://discord.com/oauth2/authorize");
    oauthURL.search = new URLSearchParams([
      ['redirect_uri', 'http://127.0.0.1:5173'], // TODO: Detect dev mode
      ['response_type', 'code'],
      ['scope', ['identify', 'guilds'].join(' ')],
      ['client_id', '1509416040025817158'] // TODO: Load from config.yml
    ]).toString();

    window.location.replace(oauthURL);
  }, []);

  // TODO: This doesn't work
  if (authState.loggingIn) {
    <Group>
      <LogIn size={14} />
      <Text>Logging in...</Text>
    </Group>
  }

  if (!user) {
    return <Group onClick={login}>
      <LogIn size={14} />
      <Text>Log in</Text>
    </Group>
  }

  return  (
    <Menu position="bottom-end" width={200}>
      <Menu.Target>
        <UnstyledButton
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 8px',
            borderRadius: 'var(--mantine-radius-sm)',
            cursor: 'pointer',
          }}
        >
          <Avatar
            size="sm"
            radius="xl"
            color="gruvboxorange"
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
            name={user.username}
          />
          <Text size="sm" c="gruvboxfg">
            {user.username}
          </Text>
          <ChevronDown size={14} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<User size={14} />}>
          Profile
        </Menu.Item>
        <Menu.Item leftSection={<Settings size={14} />}>
          Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<LogOut size={14} />}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export function TopBar({burger}: {burger: React.ReactElement}) {
  return (
    <Flex
      h="100%"
      px="md"
      align="center"
      justify="space-between"
      style={{
        borderBottom: '1px solid var(--mantine-color-gruvboxbg2)',
        height: '100%',
      }}
    >
      <Group gap="sm">
        {/* DadBot Logo */}
        {burger}
        <Text
            fw={700}
            size="lg"
            style={{ fontFamily: 'monospace' }}>
          Dadbot
        </Text>
      </Group>

      <Group gap="sm">
        <ServerSelector />
        <UserMenu />
      </Group>
    </Flex>
  );
}
