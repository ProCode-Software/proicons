import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ProIcon } from '../proicons-react'
import * as React from 'react'

function App() {
    return (
        <ProIcon icon="add" />
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)