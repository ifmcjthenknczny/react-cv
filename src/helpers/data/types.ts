import type { AnyColor } from 'colord'
import type { ReactNode } from 'react'

export const SOCIAL_TYPES = ['email', 'phone', 'linkedin', 'github', 'city'] as const

type SocialType = (typeof SOCIAL_TYPES)[number]

type Social = {
    type: SocialType
    label: string
    url?: string
}

type Month = `${number}/${number}`
type DateRange = [Month, Month | 'now']

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
    uni: string | ReactNode
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
