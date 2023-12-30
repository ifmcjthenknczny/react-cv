import Block from '../../Block'
import React from 'react'
import { getData } from '../../../../helpers/data'
import { removeDuplicates } from '../../../../helpers/utils'
import styles from './OtherSkills.module.scss'

const { tech, excludedTech = [] } = await getData('Content/Sections/OtherSkills')

const LINK = '-'

const OtherSkills = () => <Block heading="Other familiar tech" content={<TechContent tech={tech} />} />

export default OtherSkills

const TechContent = ({ tech }: { tech: string[] }) => {
    tech.sort()
    return <div className={styles.techContent}>
        {removeDuplicates(tech, [...excludedTech]).map((t, i) => <span key={i} className={styles.tech}>{normalizeTechName(t)}</span>)}
    </div>
}
const normalizeTechName = (techName: string) => `${techName.toLowerCase().split(' ').join(LINK)} `
