import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Page from './components/Page'
import Layout from './components/Layout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <Page />
    </Layout>
  </StrictMode>,
)
