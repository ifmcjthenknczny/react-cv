import { getData } from "helpers";
import Block from "../../Block";
import styles from './Projects.module.scss'

const { projects } = await getData('Content/Sections/Projects')

const Projects = () => <Block heading="notable projects" content={<ProjectContent projects={projects} />} />

export default Projects;

type ProjectType = {
    name: string
    owner?: string
    description: string
}

const ProjectContent = ({ projects }: { projects: ProjectType[] }) => <div className={styles.projects}>{projects.map((project, index) => <Project key={index} {...project} />)}</div>

const Project = ({ name, owner, description }: ProjectType) => <div className={styles.project}><div className={styles.heading}>{name}{owner ? ` @ ${owner}` : ''}</div><div className={styles.description}>{description}</div></div>
