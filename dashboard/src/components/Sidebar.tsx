import { useState } from 'react';
import {
  Flex,
  Group,
  ScrollArea,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Sparkles,
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
  { label: 'Logging', icon: <Shield width={18} height={18} /> },
  { label: 'Games', icon: <Gamepad2 width={18} height={18} /> },
  { label: 'Reaction Roles', icon: <Users width={18} height={18} /> },
  { label: 'Reports', icon: <MessageSquare width={18} height={18} /> },
  { label: 'GIFs', icon: <Sparkles width={18} height={18} /> },
  { label: 'Settings', icon: <Settings width={18} height={18} /> },
];

export function Sidebar() {
  const [collapsed, { toggle }] = useDisclosure(false);
  const [activeItem, setActiveItem] = useState<string>('Overview');

  return (
    <Flex direction="column" h="100%">
      <ScrollArea style={{ flex: 1, overflowX: 'hidden' }}>
        <Flex direction="column" gap="xs">
          {navItems.map((item) => {
            const isActive = item.label === activeItem;
            return (
              <Group
                key={item.label}
                gap="0"
                justify='flex-start'
                px="sm"
                py="xs"
                wrap="nowrap"
                style={{
                  cursor: 'pointer',
                  borderRadius: 'var(--mantine-radius-sm)',
                  background: isActive
                    ? 'var(--mantine-color-gruvboxbg2)'
                    : 'transparent',
                  transition: 'background 150ms ease',
                }}
                onMouseEnter={(e) => {
                  setActiveItem(item.label);
                  setActiveItem(item.label);
                  if (!isActive) {
                    e.currentTarget.style.background =
                      'var(--mantine-color-gruvboxbg1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
                onClick={() => setActiveItem(item.label)}
              >
              <div
                style={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: isActive ? 'var(--mantine-color-gruvboxyellow)' : 'var(--mantine-color-gruvboxfg)',
                }}
              >
                {item.icon}
              </div>
              {!collapsed && (
                <Text
                  size="sm"
                  c={isActive ? 'gruvboxyellow' : 'gruvboxfg'}
                  fw={isActive ? 600 : 400}
                  style={{ flex: 1, whiteSpace: 'nowrap', marginLeft: 'var(--mantine-spacing-sm)' }}
                >
                  {item.label}
                </Text>
              )}
            </Group>
          );
          })}
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
          onClick={toggle}
        >
          {collapsed ? <ChevronRight width={18} height={18} /> : <ChevronLeft width={18} height={18} />}
        </div>
      </Flex>
    </Flex>
  );
}
