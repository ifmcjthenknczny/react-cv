import { getData, removeDuplicates } from "../../../../helpers";

import Block from "../../Block";
import styles from './OtherSkills.module.scss'

const { tech, excludedTech = [] } = await getData('Content/Sections/OtherSkills')
const { skills } = (await getData('Content/Sections/KeySkills')) as { skills: { name: string }[] }

const keySkillsNames = skills.map((skill) => skill.name.toLowerCase())

const LINK = '-'

const OtherSkills = () => <Block heading="Other familiar tech stuff" content={<TechContent tech={tech} />} />

export default OtherSkills

const TechContent = ({ tech }: { tech: string[] }) => {
    tech.sort()
    return <div className={styles.techContent}>
        {removeDuplicates(tech, [...excludedTech, ...keySkillsNames]).map((t, i) => <span key={i} className={styles.tech}>{normalizeTechName(t)}</span>)}
    </div>
}
const normalizeTechName = (techName: string) => `${techName.toLowerCase().split(' ').join(LINK)} `
