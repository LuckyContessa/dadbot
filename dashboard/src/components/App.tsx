import {
  AppShell,
  Burger,
  MantineProvider,
} from '@mantine/core';
import { gruvboxCssVariablesResolver, gruvboxTheme } from '../theme.ts';
import { TopBar } from './TopBar.tsx';
import { Sidebar } from './Sidebar.tsx';
import { useDisclosure } from '@mantine/hooks';
import { Route, Routes } from 'react-router';
import { Overview } from '../pages/overview.tsx';
import { Logging } from '../pages/logging.tsx';
import { Games } from '../pages/games.tsx';
import { ReactionRoles } from '../pages/reactionroles.tsx';
import { Moderation } from '../pages/moderation.tsx';
import { GIFs } from '../pages/gifs.tsx';
import { Settings } from '../pages/settings.tsx';

export function App() {
  const [opened, {toggle}] = useDisclosure()

  return (
    <MantineProvider theme={gruvboxTheme} cssVariablesResolver={gruvboxCssVariablesResolver} defaultColorScheme="dark">
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
        <AppShell.Navbar>
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
