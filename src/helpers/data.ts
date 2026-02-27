import { AnyColor } from 'colord'

type SocialType = 'email' | 'phone' | 'linkedin' | 'github' | 'map'

type Social = {
    type: SocialType
    label: string
    url?: string
}

type Month = `${number}/${number}`
export type DateRange = [Month, Month | 'now']

type Experience = {
    job: string
    company: string
    date: DateRange
    description: string[]
    shortCompany?: string
    url?: string
}

type Education = {
    type: string
    uni: string | React.ReactNode
    spec: string
    thesis?: string
    date: DateRange
    uniUrl?: string
    thesisUrl?: string
}

type Language = {
    level: 1 | 2 | 3 | 4 | 5
    name: string
    description: string
}

type KeySkill = {
    name: string
    logoUrl?: string
    color?: AnyColor
    width?: number // 0 - 100
    fontColor?: string
    synonym?: string[]
}

type OtherSkill = {
    tech: string[]
    excludedTech?: string[]
    synonyms?: string[]
    potential?: string[]
}

type Activity = {
    label: string
    percent: number
}

type Project = {
    name: string
    owner?: string
    description: string
    link?: string
}

export interface PersonalData {
    heading: { name: string; position: string }
    socials: Social[]
    whoAmI: { content: string }
    experiences: Experience[]
    education: Education[]
    languages: Language[]
    keySkills: KeySkill[]
    otherSkills: OtherSkill
    responsibilities: { companyName: string; activities: Activity[] }
    projects: Project[]
}

let dataPromise: Promise<PersonalData> | null = null

async function loadData(): Promise<PersonalData> {
    if (dataPromise) return dataPromise
    dataPromise = (async () => {
        const tryData = await fetch('/data.json')
        if (tryData.ok) return (await tryData.json()) as PersonalData
        const fallback = await fetch('/data.example.json')
        if (!fallback.ok) throw new Error('Neither data.json nor data.example.json could be loaded.')
        return (await fallback.json()) as PersonalData
    })()
    return dataPromise
}

const photoModules = import.meta.glob<{ default: string }>('../assets/photo*.jpg')

export const getPhoto = async (): Promise<string> => {
    const load =
        photoModules['../assets/photo.jpg'] ??
        photoModules['../assets/photo.example.jpg']
    if (!load) throw new Error('No photo asset (photo.jpg or photo.example.jpg) found in assets.')
    const m = await load()
    return m.default
}

export async function getData<K extends keyof PersonalData>(key: K): Promise<PersonalData[K]>
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
