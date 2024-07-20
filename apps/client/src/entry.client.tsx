import { hydrateRoot } from 'react-dom/client'
import { Route } from './routes'
import { App } from './main'

hydrateRoot(
  document.body,
  <App>
    <Route />
  </App>,
)
