import { AnyColor } from 'colord'
import { z } from 'zod'

const SOCIAL_TYPES = ['email', 'phone', 'linkedin', 'github', 'map'] as const

type SocialType = typeof SOCIAL_TYPES[number]

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

const monthYearRegex = /^\d{1,2}\/\d{4}$/ // MM/YYYY
const dateRangeSchema = z.tuple([
    z.string().regex(monthYearRegex),
    z.union([z.string().regex(monthYearRegex), z.literal('now')]),
])

const socialSchema = z
    .looseObject({
        type: z.enum(SOCIAL_TYPES),
        label: z.string(),
        url: z.url().optional(),
    })
    

const experienceSchema = z
    .looseObject({
        job: z.string(),
        company: z.string(),
        date: dateRangeSchema,
        description: z.array(z.string()),
        shortCompany: z.string().optional(),
        url: z.url().optional(),
    })
    

const educationSchema = z
    .looseObject({
        type: z.string(),
        uni: z.string(),
        spec: z.string(),
        thesis: z.string().optional(),
        date: dateRangeSchema,
        uniUrl: z.url().optional(),
        thesisUrl: z.url().optional(),
    })
    

const languageSchema = z
    .looseObject({
        level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
        name: z.string(),
        description: z.string(),
    })
    

const keySkillSchema = z
    .looseObject({
        name: z.string(),
        logoUrl: z.string().url().optional(),
        color: z.string().optional(),
        width: z.number().min(0).max(100).optional(),
        fontColor: z.string().optional(),
        synonym: z.array(z.string()).optional(),
    })
    

const otherSkillSchema = z
    .looseObject({
        tech: z.array(z.string()),
        excludedTech: z.array(z.string()).optional(),
        synonyms: z.array(z.string()).optional(),
        potential: z.array(z.string()).optional(),
    })
    

const activitySchema = z
    .looseObject({
        label: z.string(),
        percent: z.number(),
    })
    

const projectSchema = z
    .looseObject({
        name: z.string(),
        owner: z.string().optional(),
        description: z.string(),
        link: z.url().optional(),
    })
    

const personalDataSchema = z
    .looseObject({
        heading: z.looseObject({ name: z.string(), position: z.string() }),
        socials: z.array(socialSchema),
        whoAmI: z.looseObject({ content: z.string() }),
        experiences: z.array(experienceSchema),
        education: z.array(educationSchema),
        languages: z.array(languageSchema),
        keySkills: z.array(keySkillSchema),
        otherSkills: otherSkillSchema,
        responsibilities: z
            .looseObject({
                companyName: z.string(),
                activities: z.array(activitySchema),
            })
        ,
        projects: z.array(projectSchema),
    })
    

function validateData(raw: unknown): PersonalData {
    const result = personalDataSchema.safeParse(raw)
    if (result.success) {
        return result.data as PersonalData
    }
    // eslint-disable-next-line no-console
    console.error('[data] JSON validation errors:')
    // eslint-disable-next-line no-console
    console.error(z.prettifyError(result.error))
    result.error.issues.forEach((issue, i) => {
        const path = issue.path?.length ? issue.path.join('.') : '(root)'
        const msg = 'message' in issue ? issue.message : String(issue)
        // eslint-disable-next-line no-console
        console.error(`  ${i + 1}. [${path}] ${msg}`)
    })
    throw new Error('Invalid data.json structure – check the console.')
}

let dataPromise: Promise<PersonalData> | null = null

async function loadData(): Promise<PersonalData> {
    if (dataPromise) return dataPromise
    dataPromise = (async () => {
        const tryData = await fetch('/data.json')
        const raw = tryData.ok
            ? await tryData.json()
            : await (async () => {
                const fallback = await fetch('/data.example.json')
                if (!fallback.ok)
                    throw new Error('Neither data.json nor data.example.json could be loaded.')
                return fallback.json()
            })()
        return validateData(raw)
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
