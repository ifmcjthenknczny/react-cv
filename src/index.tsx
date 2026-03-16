import './index.scss'

import { loadData } from '@helpers/data'
import React, { Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

const Cv = React.lazy(() => import('./Cv'))

const VALIDATION_ERROR_MSG =
    'data.json validation failed.\nsee console for more information.'

function App() {
    const [data, setData] = useState<Awaited<ReturnType<typeof loadData>>>(
        undefined
    )

    useEffect(() => {
        loadData()
            .then(setData)
            .catch(() => setData(null))
    }, [])

    if (data === undefined) {
        return null
    }
    if (data === null) {
        return (
            <div className="validation-error-screen">
                <pre>{VALIDATION_ERROR_MSG}</pre>
            </div>
        )
    }
    return (
        <Suspense fallback={null}>
            <Cv />
        </Suspense>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
