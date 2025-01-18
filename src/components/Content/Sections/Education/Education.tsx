import Block from '../../Block'
import DatesFromTo from 'components/Content/Misc/DatesFromTo'
import React from 'react'
import { getData } from 'helpers/data'
import styles from './Education.module.scss'

const { educations } = await getData('Content/Sections/Education')

const Education = () => <Block heading="Education" content={<EducationContent educations={educations} />}></Block>

type EducationType = {
    type: string
    uni: string
    spec: string
    thesis?: string
    date: [string, string]
}

const EducationContent = ({ educations }: { educations: EducationType[] }) => <>{educations.map(education => <EducationItem key={education.date[0] + education.date[1]}  {...education} />)}</>

const EducationItem = ({ type, uni, spec, thesis, date }: EducationType) => <div className={styles.educationItem}>
    <div className={styles.head}>
        <div>
            <div className={styles.spec}>{spec}</div>
            <div className={styles.uni}>{uni}</div>
        </div>
        <DatesFromTo className={styles.date} date={date} />
    </div>
    <div className={styles.type}>{type}</div>
    {thesis && <div className={styles.thesis}>Thesis: <span className={styles.thesisTitle}>{thesis}</span></div>}
</div>

export default Education

// const Line = () => <div className={styles.line} />