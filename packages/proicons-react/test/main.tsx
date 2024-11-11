import { createRoot } from 'react-dom/client'
import { ProIcon } from '../src/ProIcon.ts'
import { AddIcon } from '../src/icons'
import * as React from 'react'

function App() {
    return (
        <>
            <ProIcon icon="Search" size={32} />
            <AddIcon size={32} color="red" strokeWidth={2} />
        </>
    )
}

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)