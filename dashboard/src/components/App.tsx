import {
  AppShell,
  Burger,
  MantineProvider,
} from '@mantine/core';
import { theme } from '../theme';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { useDisclosure } from '@mantine/hooks';
import { Route, Routes } from 'react-router';
import { Overview } from '../pages/overview';
import { Logging } from '../pages/logging';
import { Games } from '../pages/games';
import { ReactionRoles } from '../pages/reactionroles';
import { Moderation } from '../pages/moderation';
import { GIFs } from '../pages/gifs';
import { Settings } from '../pages/settings';

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
          <Routes>
            <Route index element={<Overview/>}/>
            <Route path="overview" element={<Overview/>}/>
            <Route path="logging" element={<Logging/>}/>
            <Route path="games" element={<Games/>}/>
            <Route path="reactionroles" element={<ReactionRoles/>}/>
            <Route path="moderation" element={<Moderation/>}/>
            <Route path="gifs" element={<GIFs/>}/>
            <Route path="settings" element={<Settings/>}/>
          </Routes>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
