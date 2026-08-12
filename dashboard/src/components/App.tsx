import {
  AppShell,
  Burger,
  MantineProvider,
} from '@mantine/core';
import { theme } from '../theme';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { useAuthState } from '../state/auth';
import { useDisclosure } from '@mantine/hooks';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';

export function App() {
  const authState = useAuthState();
  const [opened, {toggle}] = useDisclosure()
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      setSearchParams("")
      authState.login(code);
    }
  }, [])

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
              size='sm' />}/>
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
          AuthState: {JSON.stringify(authState)}
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
