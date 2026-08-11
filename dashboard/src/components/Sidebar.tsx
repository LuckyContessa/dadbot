import {
  Flex,
  Group,
  ScrollArea,
  Text,
} from '@mantine/core';
import {
  BarChart3,
  ChevronLeft,
  Gamepad2,
  Gift,
  MessageSquare,
  Settings,
  Shield,
  Users,
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Overview', icon: <BarChart3 width={18} height={18} />, active: true },
  { label: 'Settings', icon: <Settings width={18} height={18} /> },
  { label: 'Logging', icon: <Shield width={18} height={18} /> },
  { label: 'Games', icon: <Gamepad2 width={18} height={18} /> },
  { label: 'Reaction Roles', icon: <Users width={18} height={18} /> },
  { label: 'Reports', icon: <MessageSquare width={18} height={18} /> },
  { label: 'GIFs', icon: <Gift width={18} height={18} /> },
];

export function Sidebar() {
  return (
    <Flex direction="column" h="100%">
      <ScrollArea style={{ flex: 1 }}>
        <Flex direction="column" gap="xs">
          {navItems.map((item) => (
            <Group
              key={item.label}
              gap="sm"
              px="sm"
              py="xs"
              wrap="nowrap"
              style={{
                cursor: 'pointer',
                borderRadius: 'var(--mantine-radius-sm)',
                background: item.active
                  ? 'var(--mantine-color-gruvboxbg2)'
                  : 'transparent',
                transition: 'background 150ms ease',
              }}
              onMouseEnter={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background =
                    'var(--mantine-color-gruvboxbg1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: item.active ? 'var(--mantine-color-gruvboxyellow)' : 'var(--mantine-color-gruvboxfg)',
                }}
              >
                {item.icon}
              </div>
              <Text
                size="sm"
                c={item.active ? 'gruvboxyellow' : 'gruvboxfg'}
                fw={item.active ? 600 : 400}
                style={{ flex: 1, whiteSpace: 'nowrap' }}
              >
                {item.label}
              </Text>
            </Group>
          ))}
        </Flex>
      </ScrollArea>

      {/* Collapse toggle */}
      <Flex justify="center" py="sm">
        <div
          style={{
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--mantine-color-gruvboxfg)',
            cursor: 'pointer',
          }}
        >
          <ChevronLeft width={18} height={18} />
        </div>
      </Flex>
    </Flex>
  );
}
