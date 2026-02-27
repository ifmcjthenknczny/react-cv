import Block from '../../../utils/Block'
import React from 'react'
import TimelineHeading from '../../../utils/TimelineHeading'
import { getData, PersonalData } from '../../../../helpers/data'
import styles from './index.module.scss'

// PROTIP: start every bulletpoint of experience with verbs

const experiences = await getData('experiences')

const Experience = () => (
    <Block
        heading="latest experience"
        content={<ExperienceContent experiences={experiences} />}
    />
)

const ExperienceContent = ({
    experiences
}: {
    experiences: PersonalData['experiences']
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
}: PersonalData['experiences'][number]) => {
    const mappedDescription = (description ?? []).map(line => {
        const trimmedLine = line.trim()
        return trimmedLine.at(-1) === '.' ? trimmedLine : `${trimmedLine}.`
    })
    return <div className={styles.experienceItem}>
        <TimelineHeading
            primaryContent={job}
            secondaryContent={url ? <a href={url}>{company}</a> : company}
            date={date}
        />
        {mappedDescription && (
            <div className={styles.description}>
                <ul>
                    {mappedDescription.map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>
}

export default Experience
