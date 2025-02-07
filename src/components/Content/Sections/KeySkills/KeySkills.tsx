import Block from '../../Block'
import React from 'react'
import { colord } from 'colord'
import { determineFontColor } from '../../../../helpers/color'
import { getData } from '../../../../helpers/data'
import styles from './KeySkills.module.scss'

const { skills } = await getData('Content/Sections/KeySkills')

export const OPACITY = 0.7

const KeySkills = () => (
    <Block
        heading="Key technical Skills"
        content={<KeySkillsContent skills={skills} />}
    />
)

export type SkillType = {
    name: string
    logoUrl: string
    color: string
    width?: number // 0 - 100
    fontColor?: string
}

const KeySkillsContent = ({ skills }: { skills: SkillType[] }) => (
    <div className={styles.keySkills}>
        {skills.map((skill, i) => (
            <KeySkill key={i} skill={skill} index={i} />
        ))}
    </div>
)

const KeySkill = ({ skill, index }: { skill: SkillType; index: number }) => {
    const computedBackgroundColor = skill.logoUrl
        ? colord(skill.color).darken(0).toHex()
        : skill.color
    return (
        <div className={styles.keySkill}>
            <div
                style={{
                    backgroundColor: computedBackgroundColor,
                    opacity: OPACITY,
                    color:
                        skill.fontColor ??
                        determineFontColor(
                            computedBackgroundColor ?? '#ffffff'
                        ),
                    width: `${calculateWidth(95, 80, index, skills.length)}%`
                }}
                className={styles.keySkillContainer}
            >
                {skill.logoUrl && (
                    <img src={skill.logoUrl} className={styles.logo} />
                )}
                <span className={styles.name}>{skill.name.toLowerCase()}</span>
            </div>
        </div>
    )
}

export default KeySkills

const calculateWidth = (
    max: number,
    min: number,
    index: number,
    length: number
) => max - (max - min) * (index / (length - 1))
