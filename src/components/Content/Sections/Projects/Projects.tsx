import Block from '../../Block'
import React from 'react'
import { getData } from '../../../../helpers/data'
import styles from './Projects.module.scss'

const { projects } = await getData('Content/Sections/Projects')

const Projects = () => <Block heading="notable projects" content={<ProjectContent projects={projects} />} />

export default Projects

type ProjectType = {
    name: string
    owner?: string
    description: string
    link?: string
}

const ProjectContent = ({ projects }: { projects: ProjectType[] }) => <div className={styles.projects}>{projects.map((project, index) => <Project key={index} {...project} />)}</div>

const Project = ({ name, link, owner, description }: ProjectType) => <div className={styles.project}><div className={styles.heading}>{link ? <a href={link}>{name}</a> : name}{owner ? ` @${owner.toLowerCase()}` : ''}</div><div className={styles.description}>{description}</div></div>
