import { z } from 'zod'
import { SOCIAL_TYPES } from './types'
import type { PersonalData } from './types'

const monthYearRegex = /^\d{1,2}\/\d{4}$/ // MM/YYYY
const dateRangeSchema = z.tuple([
    z.string().regex(monthYearRegex),
    z.union([z.string().regex(monthYearRegex), z.literal('now')]),
])

const socialSchema = z.looseObject({
    type: z.enum(SOCIAL_TYPES),
    label: z.string(),
    url: z.url().optional(),
})

const experienceSchema = z.looseObject({
    job: z.string(),
    company: z.string(),
    date: dateRangeSchema,
    description: z.array(z.string()),
    shortCompany: z.string().optional(),
    url: z.url().optional(),
})

const educationSchema = z.looseObject({
    type: z.string(),
    uni: z.string(),
    spec: z.string(),
    thesis: z.string().optional(),
    date: dateRangeSchema,
    uniUrl: z.url().optional(),
    thesisUrl: z.url().optional(),
})

const languageSchema = z.looseObject({
    level: z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
    ]),
    name: z.string(),
    description: z.string(),
})

const keySkillSchema = z.looseObject({
    name: z.string(),
    logoUrl: z.string().url().optional(),
    color: z.string().optional(),
    width: z.number().min(0).max(100).optional(),
    fontColor: z.string().optional(),
    synonym: z.array(z.string()).optional(),
})

const otherSkillSchema = z.looseObject({
    tech: z.array(z.string()),
    excludedTech: z.array(z.string()).optional(),
    synonyms: z.array(z.string()).optional(),
    potential: z.array(z.string()).optional(),
})

const activitySchema = z.looseObject({
    label: z.string(),
    percent: z.number(),
})

const projectSchema = z.looseObject({
    name: z.string(),
    owner: z.string().optional(),
    description: z.string(),
    link: z.url().optional(),
})

const personalDataSchema = z.looseObject({
    heading: z.looseObject({ name: z.string(), position: z.string() }),
    socials: z.array(socialSchema),
    whoAmI: z.looseObject({ content: z.string() }),
    experiences: z.array(experienceSchema),
    education: z.array(educationSchema),
    languages: z.array(languageSchema),
    keySkills: z.array(keySkillSchema),
    otherSkills: otherSkillSchema,
    responsibilities: z.looseObject({
        companyName: z.string(),
        activities: z.array(activitySchema),
    }),
    projects: z.array(projectSchema),
})

export function validateData(raw: unknown): PersonalData {
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
