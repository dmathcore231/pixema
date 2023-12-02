import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import { tokenJWT } from './utils/token'

async function initApp() {
  await tokenJWT()
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
  )
}

initApp()
