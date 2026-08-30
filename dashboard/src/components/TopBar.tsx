import {
  Avatar,
  Button,
  Flex,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { ChevronDown, LogIn, LogOut } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../state/auth.ts';
import { useSearchParams } from 'react-router';
import { useConfig } from '../state/config.ts';


export function UserMenu() {
  const authState = useAuth();
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
  const authState = useAuth();
  const config = useConfig();
  const user = authState.user;
  const [loggingIn, setLoggingIn] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) { 
      setSearchParams("")
      authState.login(code)
        .then(() => config.load())
        .then(() => setLoggingIn(false));
    } else {
      authState.load()
        .then(() => config.load())
        .then(() => setLoggingIn(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = useCallback(() => {
    if (!config.homeUrl || !config.clientId) {
      console.log("Can't log in, we dont' have bot config yet.")
      return
    }

    const oauthURL = new URL("https://discord.com/oauth2/authorize");
    oauthURL.search = new URLSearchParams([
      ['redirect_uri', config.homeUrl], // TODO: Detect dev mode
      ['response_type', 'code'],
      ['scope', ['identify', 'guilds'].join(' ')],
      ['client_id', config.clientId]
    ]).toString();

    globalThis.location.replace(oauthURL);
  }, [config]);

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
        {burger}
        <Avatar src="/DadTie.svg" alt="DadBot logo" />
        <Text
            fw={700}
            size="xl"
            style={{ fontFamily: 'monospace' }}>
          Dadbot
        </Text>
      </Group>

      {user && <UserMenu />}
      {!user && <Button leftSection={<LogIn size={14} />} loading={loggingIn || !config.clientId} variant="outline" onClick={login}>
        Log in
      </Button>}
    </Flex>
  );
}
