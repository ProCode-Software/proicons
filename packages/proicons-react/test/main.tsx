import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { ProIcon } from '../src/ProIcon.ts'
import { AddIcon, TvIcon } from '../src/icons'

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
            {/* Test for https://github.com/ProCode-Software/proicons/issues/5 */}
            <div style={{ color: 'green' }}>
                <AddIcon color="red" /> {/* red ✓ */}
                <TvIcon /> {/* green ✓ */}
            </div>
            <div style={{ color: 'blue' }}>
                <AddIcon /> {/* red x */}
                <TvIcon /> {/* blue ✓ */}
            </div>
        </>
    )
}

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
