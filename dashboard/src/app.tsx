import '@mantine/core/styles.css'
import { AppShell, Burger, ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';

const theme = createTheme({
  // TODO: Make this gruvbox dark theme
})

export default function App() {
  const [opened, { toggle }] = useDisclosure();

  return <>
    <ColorSchemeScript defaultColorScheme='dark'/>
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <AppShell padding='md' header={{height: 60}} navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !opened}}}>
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm'/>
          <div>DadBot</div>
        </AppShell.Header>
        <AppShell.Navbar>
          Navbar
        </AppShell.Navbar>
        <AppShell.Main>
          Main
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  </>
}
