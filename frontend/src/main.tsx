import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import { refreshToken } from './utils/refreshToken'

async function initApp() {
  await refreshToken()
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
  )
}

initApp()
