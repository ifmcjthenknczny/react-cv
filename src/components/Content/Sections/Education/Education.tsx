import Block from '../../Block'
import React from 'react'
import TimelineHeading from '../../TimelineHeading'
import { getData } from '../../../../helpers/data'
import styles from './Education.module.scss'

const { educations } = await getData('Content/Sections/Education')

const Education = () => (
    <Block
        heading="Education"
        content={<EducationContent educations={educations} />}
    ></Block>
)

type EducationType = {
    type: string
    uni: string | React.ReactNode
    spec: string
    thesis?: string
    date: [string, string]
    uniUrl?: string
    thesisUrl?: string
}

const EducationContent = ({ educations }: { educations: EducationType[] }) => {
    return (
        <>
            {educations.map((education) => {
                const uniComponent = education.uniUrl ? (
                    <a href={education.uniUrl}>{education.uni}</a>
                ) : (
                    education.uni
                )

                return (
                    <EducationItem
                        key={education.date[0] + education.date[1]}
                        {...education}
                        uni={uniComponent}
                    />
                )
            })}
        </>
    )
}

const EducationItem = ({
    type,
    uni,
    spec,
    thesis,
    date,
    thesisUrl
}: EducationType) => (
    <div className={styles.educationItem}>
        <TimelineHeading
            primaryContent={spec}
            secondaryContent={uni}
            date={date}
        />
        <div className={styles.type}>{type}</div>
        {thesis && (
            <div className={styles.thesis}>
                Thesis:{' '}
                <span className={styles.thesisTitle}>
                    {thesisUrl ? <a href={thesisUrl}>{thesis}</a> : thesis}
                </span>
            </div>
        )}
    </div>
)

export default Education

// const Line = () => <div className={styles.line} />
