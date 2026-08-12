import {
  Avatar,
  Flex,
  Group,
  Menu,
  Select,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { ChevronDown, Globe, LogOut, Settings, User } from 'lucide-react';

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
            name="Whit"
          />
          <Text size="sm" c="gruvboxfg">
            Whit
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

export function TopBar() {
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
        <Text
          fw={700}
          c="gruvboxyellow"
          size="lg"
          style={{ fontFamily: 'monospace' }}
        >
          DadBot Dashboard
        </Text>
      </Group>

      <Group gap="sm">
        <ServerSelector />
        <UserMenu />
      </Group>
    </Flex>
  );
}
