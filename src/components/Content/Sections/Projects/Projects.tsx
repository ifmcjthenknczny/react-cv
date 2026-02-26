import Block from '../../Block'
import { ExperienceType } from '../Experience/Experience'
import React from 'react'
import { getData } from '../../../../helpers/data'
import styles from './Projects.module.scss'

const { projects, experiences } = await getData('Content/Sections/Projects')

const Projects = () => (
    <Block
        heading="notable projects"
        content={<ProjectContent projects={projects} />}
    />
)

type ProjectType = {
    name: string
    owner?: string
    description: string
    link?: string
}

const ProjectContent = ({ projects }: { projects: ProjectType[] }) => (
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
    experiences?: ExperienceType[]
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

const Project = ({ name, link, owner, description }: ProjectType) => (
    <div className={styles.project}>
        <div className={styles.heading}>
            {link ? <a href={link}>{name}</a> : name}
            <ProjectOwner ownerName={owner} experiences={experiences} />
        </div>
        <div className={styles.description}>{description}</div>
    </div>
)

export default Projects
