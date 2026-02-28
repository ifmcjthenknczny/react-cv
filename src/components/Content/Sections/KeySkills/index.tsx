import Block from '../../../utils/Block'
import classNames from 'classnames'
import { colord } from 'colord'
import { determineFontColor, getOpacity } from '@helpers/color'
import { getData, PersonalData } from '@helpers/data'
import styles from './index.module.scss'
import React from 'react'


const keySkills = await getData('keySkills')
const opacity = getOpacity()
// PROTIP: recommended to use about 10 key skills

const calculateWidth = (
    max: number,
    min: number,
    index: number,
    length: number
) => max - (max - min) * (index / length - 1)

const KeySkills = () => (
    <Block
        heading="Key technical Skills"
        content={<KeySkillsContent skills={keySkills} />}
        smallHeadingMargin
    />
)

const KeySkillsContent = ({ skills }: { skills: PersonalData['keySkills'] }) => (
    <div className={styles.keySkills}>
        {skills.map((skill, i) => (
            <KeySkill key={i} skill={skill} index={i} />
        ))}
    </div>
)

const KeySkill = ({ skill, index }: { skill: PersonalData['keySkills'][number]; index: number }) => {
    // TODO: i use colord library in case of darkening the color, but it's not necessary
    const computedBackgroundColor = colord(skill.color ?? '#000000').toHex()
    return (
        <div className={styles.keySkill}>
            {skill.logoUrl && <div className={classNames(styles.logo, styles.logoBackground)}>
                <img src={skill.logoUrl} className={styles.logo} />
            </div>}
            <div
                style={{
                    backgroundColor: computedBackgroundColor,
                    opacity,
                    color:
                        skill.fontColor ??
                        determineFontColor(
                            computedBackgroundColor ?? '#ffffff'
                        ),
                    width: `${calculateWidth(95, 80, index, keySkills.length)}%`
                }}
                className={styles.keySkillContainer}
            >
                <span className={styles.name}>{skill.name.toLowerCase()}</span>
            </div>
        </div>
    )
}

export default KeySkills