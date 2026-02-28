import { validateData } from './schema'
import type { PersonalData } from './types'

let dataPromise: Promise<PersonalData> | null = null

async function loadData(): Promise<PersonalData> {
    if (dataPromise) {
        return dataPromise
    }
    dataPromise = (async () => {
        const tryData = await fetch('/data.json')
        const raw = tryData.ok
            ? await tryData.json()
            : await (async () => {
                const fallback = await fetch('/data.example.json')
                if (!fallback.ok)
                    throw new Error(
                        'Neither data.json nor data.example.json could be loaded.'
                    )
                return fallback.json()
            })()
        return validateData(raw)
    })()
    return dataPromise
}

const photoModules = import.meta.glob<{ default: string }>(
    '../../assets/photo*.jpg'
)

export const getPhoto = async (): Promise<string> => {
    const load =
        photoModules['../../assets/photo.jpg'] ??
        photoModules['../../assets/photo.example.jpg']
    if (!load)
        throw new Error(
            'No photo asset (photo.jpg or photo.example.jpg) found in assets.'
        )
    const m = await load()
    return m.default
}

export async function getData<K extends keyof PersonalData>(
    key: K
): Promise<PersonalData[K]>
export async function getData<K extends keyof PersonalData>(
    key: K[]
): Promise<{ [P in K]: PersonalData[P] }>
export async function getData<T = unknown>(
    key: string | keyof PersonalData | (keyof PersonalData)[]
): Promise<T> {
    const data = await loadData()
    if (Array.isArray(key)) {
        return key.reduce(
            (acc, k) => {
                acc[k] = data[k]
                return acc
            },
            {} as Record<keyof PersonalData, unknown>
        ) as T
    }
    return data[key as keyof PersonalData] as T
}
