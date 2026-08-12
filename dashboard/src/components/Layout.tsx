import {
  AppShell,
  MantineProvider,
} from '@mantine/core';
import { theme } from '../theme';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AppShell
        padding="md"
        header={{ height: 56 }}
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
