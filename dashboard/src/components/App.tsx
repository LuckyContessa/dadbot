import {
  AppShell,
  Burger,
  MantineProvider,
} from '@mantine/core';
import { theme } from '../theme';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { useDisclosure } from '@mantine/hooks';

export function App() {
  const [opened, {toggle}] = useDisclosure()

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AppShell
        padding="md"
        header={{ height: 56 }}
        navbar={{ width: 220, breakpoint: "sm", collapsed: {mobile: !opened } }} >
        <AppShell.Header>
          <TopBar burger={<Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom='sm'
              size='sm' />} />
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
          Hi there
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
