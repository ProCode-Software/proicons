import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProIcon } from '../src/ProIcon.tsx'

function App() {
    return (
        <ProIcon icon="Add" />
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)