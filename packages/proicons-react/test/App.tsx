import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { ProIcon } from '../src/ProIcon.tsx'
import { AddIcon, TvIcon, BrainIcon } from '../src/icons.ts'

function App() {
    const [size, setSize] = React.useState(48)
    const randomIcons = ['Photo', 'Search', 'Cheese', 'Toast', 'Save']
    const getRandomIcon = () =>
        randomIcons[Math.floor(Math.random() * randomIcons.length)]
    const [icon, setIcon] = React.useState(getRandomIcon())

    return (
        <>
            <h1>ProIcons React Test</h1>
            <ProIcon icon="Add Square Multiple" size={32} className="myClass" />
            <AddIcon size={32} color="red" strokeWidth={2} className="myIconClassAdd" />
            {/* Test for https://github.com/ProCode-Software/proicons/issues/5 */}
            <div style={{ color: 'green' }}>
                <AddIcon color="red" /> {/* red ✓ */}
                <TvIcon /> {/* green ✓ */}
            </div>
            <div style={{ color: 'blue' }}>
                <AddIcon /> {/* red x */}
                <TvIcon /> {/* blue ✓ */}
            </div>
            <h2>Dynamic icons</h2>
            Size:{' '}
            <input
                type="range"
                value={size}
                onChange={e => setSize(+e.target.value)}
                min="24"
                max="72"
            />
            <br />
            <ProIcon icon="Search Cancel" size={size} />
            <BrainIcon size={size} />
            <br />
            <ProIcon icon={icon} size={size} />
            <button onClick={() => setIcon(getRandomIcon())}>Random Icon</button>
        </>
    )
}

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
