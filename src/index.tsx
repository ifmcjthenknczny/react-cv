import './index.scss'

import { loadData } from '@helpers/data'
import React, { Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

const Cv = React.lazy(() => import('./Cv'))

const VALIDATION_ERROR_MSG =
    'data.json validation failed.\nsee console for more information.'

function buildPdfTitle(fullName: string): string {
    const parts = fullName.trim().split(/\s+/).filter(Boolean)
    const firstName = parts[0] ?? ''
    const lastName = parts[parts.length - 1] ?? ''

    const sanitize = (s: string) => s.replace(/[\\/:*?"<>|\s]+/g, '')
    const firstClean = sanitize(firstName)
    const lastClean = sanitize(lastName)

    if (!firstClean || !lastClean) {
        return 'CV'
    }
    return `${lastClean.toLowerCase()}${firstClean}`
}

function App() {
    const [data, setData] = useState<Awaited<ReturnType<typeof loadData>> | undefined>(
        undefined
    )

    useEffect(() => {
        loadData()
            .then((d) => {
                setData(d)
                document.title = d?.heading?.name
                    ? buildPdfTitle(d.heading.name)
                    : 'CV'
            })
            .catch(() => {
                setData(null)
                document.title = 'CV'
            })
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
