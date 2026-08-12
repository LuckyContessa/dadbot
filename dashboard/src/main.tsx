import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Layout } from './components/Layout'
import '@mantine/core/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <div style={{ padding: '1rem' }}>
        {/* Main content — pages go here */}
      </div>
    </Layout>
  </StrictMode>,
)
