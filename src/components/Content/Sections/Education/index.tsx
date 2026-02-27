import Block from '../../../utils/Block'
import React from 'react'
import TimelineHeading from '../../../utils/TimelineHeading'
import { getData, PersonalData } from '../../../../helpers/data'
import styles from './index.module.scss'

const education = await getData('education')

const Education = () => (
    <Block
        heading="Education"
        content={<EducationContent educations={education} />}
    ></Block>
)

const EducationContent = ({ educations }: { educations: PersonalData['education'] }) => {
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
}: PersonalData['education'][number]) => (
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
