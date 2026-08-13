import {
  Avatar,
  Flex,
  Group,
  Loader,
  Menu,
  Select,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { ChevronDown, Globe, LogIn, LogOut } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuthState } from '../state/auth';
import { useSearchParams } from 'react-router';

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
  const authState = useAuthState();
  const user = authState.user;
  if (!user) return <>Nope.</>
  const username = user.global_name || user.username;

  return (
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
            name={username}
          />
          <Text size="sm" c="gruvboxfg">
            {username}
          </Text>
          <ChevronDown size={14} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<LogOut size={14} />} onClick={() => authState.logout()}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export function TopBar({burger}: {burger: React.ReactElement}) {
  const authState = useAuthState();
  const user = authState.user;
  const [loggingIn, setLoggingIn] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) { 
      setSearchParams("")
      authState.login(code)
        .then(() => setLoggingIn(false));
    } else {
      authState.load()
        .then(() => setLoggingIn(false));
    }
  }, [])

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
        {user && <UserMenu />}
        {!user && loggingIn && <Loader size={20} />}
        {!user && !loggingIn && <Group onClick={login}>
            <LogIn size={14} />
            <Text>Log in</Text>
          </Group>}
      </Group>
    </Flex>
  );
}
