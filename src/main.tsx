import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UserProvider } from './context/UserContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <App />
  </UserProvider>
)
