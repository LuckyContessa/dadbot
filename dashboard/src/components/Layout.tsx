import {
  AppShell,
  MantineProvider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { theme } from '../theme';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  const [opened, ] = useDisclosure(true);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AppShell
        padding="md"
        header={{ height: 56 }}
        navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      >
        <AppShell.Header>
          <TopBar />
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <Sidebar />
        </AppShell.Navbar>
        <AppShell.Main
          style={{
            background: 'var(--mantine-color-body)',
            minHeight: 'calc(100vh - 56px)',
          }}
        >
          {children}
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
