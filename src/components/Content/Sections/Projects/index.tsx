import Block from '../../../utils/Block'
import React from 'react'
import { getData } from '@helpers/data'
import styles from './index.module.scss'
import { PersonalData } from '@helpers/data'

const projects = await getData('projects')
const experiences = await getData('experiences')

const Projects = () => (
    <Block
        heading="notable projects"
        content={<ProjectContent projects={projects} />}
    />
)



const ProjectContent = ({ projects }: { projects: PersonalData['projects'] }) => (
    <div className={styles.projects}>
        {projects.map((project, index) => (
            <Project key={index} {...project} />
        ))}
    </div>
)

const ProjectOwner = ({
    ownerName,
    experiences
}: {
    ownerName?: string
    experiences?: PersonalData['experiences']
}) => {
    if (!ownerName) {
        return ''
    }

    const existingExperienceUrl = (experiences || []).filter(
        (experience) =>
            experience.company.toLowerCase() === ownerName.toLowerCase()
    )?.[0].url
    const ownerTextContent = ` @${ownerName.toLowerCase()}`

    if (existingExperienceUrl) {
        return <a href={existingExperienceUrl}>{ownerTextContent}</a>
    }

    return ownerTextContent
}

const Project = ({ name, link, owner, description }: PersonalData['projects'][number]) => (
    <div className={styles.project}>
        <div className={styles.heading}>
            {link ? <a href={link}>{name}</a> : name}
            <ProjectOwner ownerName={owner} experiences={experiences} />
        </div>
        <div className={styles.description}>{description}</div>
    </div>
)

export default Projects
