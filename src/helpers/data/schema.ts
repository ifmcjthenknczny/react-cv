import { z } from 'zod'
import { SOCIAL_TYPES } from './types'
import type { PersonalData } from './types'

const nonEmptyString = z.string().min(1, 'must not be empty')
const monthYearRegex = /^\d{1,2}\/\d{4}$/ // MM/YYYY

function isMonthYearInFuture(mmYyyy: string): boolean {
    const [mm, yyyy] = mmYyyy.split('/').map(Number)
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1
    return yyyy > currentYear || (yyyy === currentYear && mm > currentMonth)
}

const dateRangeSchema = z
    .tuple([
        z.string().regex(monthYearRegex),
        z.union([z.string().regex(monthYearRegex), z.literal('now')]),
    ])
    .refine(
        ([start, end]) =>
            !isMonthYearInFuture(start) &&
            (end === 'now' || !isMonthYearInFuture(end)),
        { message: 'date must not be in the future' },
    )

const socialSchema = z.looseObject({
    type: z.enum(SOCIAL_TYPES),
    label: nonEmptyString,
    url: z.url().optional(),
})

const experienceSchema = z.looseObject({
    job: nonEmptyString,
    company: nonEmptyString,
    date: dateRangeSchema,
    description: z.array(nonEmptyString).min(1, 'at least one item required'),
    shortCompany: nonEmptyString.optional(),
    url: z.url().optional(),
})

const educationSchema = z.looseObject({
    type: nonEmptyString,
    uni: nonEmptyString,
    spec: nonEmptyString,
    thesis: nonEmptyString.optional(),
    date: dateRangeSchema,
    uniUrl: z.url().optional(),
    thesisUrl: z.url().optional(),
})

const languageSchema = z.looseObject({
    level: z.int().min(1).max(5),
    name: nonEmptyString,
    description: nonEmptyString,
})

const keySkillSchema = z.looseObject({
    name: nonEmptyString,
    logoUrl: z.string().url().optional(),
    color: z.string().optional(),
    width: z.number().min(0).max(100).optional(),
    fontColor: z.string().optional(),
    synonym: z.array(nonEmptyString).optional(),
})

const otherSkillsSchema = z.looseObject({
    tech: z.array(nonEmptyString).min(1, 'at least one tech required'),
    excludedTech: z.array(nonEmptyString).optional(),
    synonyms: z.array(nonEmptyString).optional(),
    potential: z.array(nonEmptyString).optional(),
})

const activitySchema = z.looseObject({
    label: nonEmptyString,
    percent: z.number().min(0).max(100),
})

const projectSchema = z.looseObject({
    name: nonEmptyString,
    owner: nonEmptyString.optional(),
    description: nonEmptyString,
    link: z.url().optional(),
})

const personalDataSchema = z.looseObject({
    heading: z.looseObject({ name: nonEmptyString, position: nonEmptyString }),
    socials: z.array(socialSchema).min(1, 'at least one social required'),
    whoAmI: z.looseObject({ content: nonEmptyString }),
    experiences: z.array(experienceSchema).min(1, 'at least one experience required'),
    education: z.array(educationSchema).min(1, 'at least one education entry required'),
    languages: z.array(languageSchema).min(1, 'at least one language required'),
    keySkills: z.array(keySkillSchema).min(1, 'at least one key skill required'),
    otherSkills: otherSkillsSchema,
    responsibilities: z
        .looseObject({
            companyName: nonEmptyString,
            activities: z.array(activitySchema).min(1, 'at least one activity required'),
        })
        .refine(
            (data) =>
                Math.abs(data.activities.reduce((sum, a) => sum + a.percent, 0) - 100) < 1e-6,
            { message: 'activities percent values must sum to 100', path: ['responsibilities'] },
        ),
    projects: z.array(projectSchema).min(1, 'at least one project required'),
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
