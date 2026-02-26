export interface AppData {
    heading: { name: string; position: string; photo?: string }
    socials: Array<{ type: string; label: string; url?: string }>
    whoAmI: { content: string }
    experience: { experiences: unknown[] }
    education: { educations: unknown[] }
    languages: { languages: unknown[] }
    keySkills: { skills: unknown[] }
    otherSkills: { tech: string[]; excludedTech?: string[]; synonyms?: string[] }
    responsibilities: { companyName: string; activities: unknown[] }
    projects: { projects: unknown[] }
}

let dataPromise: Promise<AppData> | null = null

async function loadData(): Promise<AppData> {
    if (dataPromise) return dataPromise
    dataPromise = (async () => {
        const tryData = await fetch('/data.json')
        if (tryData.ok) return (await tryData.json()) as AppData
        const fallback = await fetch('/data.example.json')
        if (!fallback.ok) throw new Error('Neither data.json nor data.example.json could be loaded.')
        return (await fallback.json()) as AppData
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

function getSlice(data: AppData, module: string): unknown {
    const pathMap: Record<string, string> = {
        'Heading': 'heading',
        'Heading/Socials': 'socials',
        'Content/Sections/WhoAmI': 'whoAmI',
        'Content/Sections/Experience': 'experience',
        'Content/Sections/Education': 'education',
        'Content/Sections/Languages': 'languages',
        'Content/Sections/KeySkills': 'keySkills',
        'Content/Sections/OtherSkills': 'otherSkills',
        'Content/Sections/Responsibilities': 'responsibilities',
        'Content/Sections/Projects': 'projects'
    }
    const key = pathMap[module]
    if (key === undefined) throw new Error(`Unknown data module: ${module}`)
    if (module === 'Heading/Socials') return { socials: data.socials }
    if (module === 'Content/Sections/Projects') {
        return {
            projects: data.projects.projects,
            experiences: data.experience.experiences
        }
    }
    return data[key as keyof AppData]
}

export const getData = async <T = unknown>(module: string): Promise<T> => {
    const data = await loadData()
    return getSlice(data, module) as T
}
