import Block from "../../Block";
import React from 'react'
import { getData } from "../../../../helpers";
import styles from './Experience.module.scss'

const { experiences } = await getData('Content/Sections/Experience')

const Experience = () => <Block heading="latest experience" content={<ExperienceContent experiences={experiences} />} />

export default Experience

export type ExperienceType = {
    job: string
    company: string
    date: [string, string]
    description: string[]
    shortCompany?: string
}

const ExperienceContent = ({ experiences }: { experiences: ExperienceType[] }) => <>{experiences.map(experience => <ExperienceItem key={experience.date[0] + experience.date[1]} {...experience} />)}</>

const ExperienceItem = ({ job, company, date, description }: ExperienceType) => <div className={styles.experienceItem}>
    <div className={styles.head}>
        <div>
            <div className={styles.job}>{job}</div>
            <div className={styles.company}>{company}</div>
        </div>
        <div className={styles.date}>{date[0]} - {date[1]}</div>
    </div>
    {description && <div className={styles.description}><ul>{description.map((line, index) => <li key={index}>{line}</li>)}</ul></div>}
</div>



