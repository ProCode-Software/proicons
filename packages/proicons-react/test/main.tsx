import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { ProIcon } from '../src/ProIcon.ts'
import { AddIcon } from '../src/icons'

function App() {
    return (
        <>
            <ProIcon icon="Search" size={32} className="myIconClassSearch" />
            <AddIcon
                size={32}
                color="red"
                strokeWidth={2}
                className="myIconClassAdd"
            />
        </>
    )
}

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
