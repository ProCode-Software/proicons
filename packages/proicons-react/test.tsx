import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProIcon } from './src/proicons-react'
import * as React from 'react'

function App() {
    return (
        <ProIcon />
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)