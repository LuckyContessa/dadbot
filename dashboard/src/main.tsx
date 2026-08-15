import { createRoot } from 'react-dom/client'
import { App } from './components/App'
import '@mantine/core/styles.css'
import { HashRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>
)
