import Block from '../../Block'
import React from 'react'
import TimelineHeading from '../../TimelineHeading'
import { getData } from '../../../../helpers/data'
import styles from './Experience.module.scss'

// start every bulletpoint of experience with verbs

const { experiences } = await getData('Content/Sections/Experience')

const Experience = () => (
    <Block
        heading="latest experience"
        content={<ExperienceContent experiences={experiences} />}
    />
)

export default Experience

export type ExperienceType = {
    job: string
    company: string
    date: [string, string]
    description: string[]
    shortCompany?: string
    url?: string
}

const ExperienceContent = ({
    experiences
}: {
    experiences: ExperienceType[]
}) => (
    <>
        {experiences.map((experience) => (
            <ExperienceItem
                key={experience.date[0] + experience.date[1]}
                {...experience}
            />
        ))}
    </>
)

const ExperienceItem = ({
    job,
    company,
    date,
    description,
    url
}: ExperienceType) => (
    <div className={styles.experienceItem}>
        <TimelineHeading
            primaryContent={job}
            secondaryContent={url ? <a href={url}>{company}</a> : company}
            date={date}
        />
        {description && (
            <div className={styles.description}>
                <ul>
                    {description.map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>
)
