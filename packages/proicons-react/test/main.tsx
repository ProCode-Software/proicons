import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { ProIcon } from '../src/ProIcon.ts'
import { AddIcon } from '../src/icons'

function App() {
    return (
        <>
            <ProIcon icon="Add Square Multiple" size={32} className="myClass" />
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
