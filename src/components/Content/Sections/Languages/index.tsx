import Block from '../../../utils/Block'
import React from 'react'
import gb from '../../../../assets/gb64.png'
import { getData, PersonalData } from '@helpers/data'
import pl from '../../../../assets/pl64.png'
import styles from './index.module.scss'
import unicorn from '../../../../assets/unicorn64.png'

const languages = await getData('languages')

const Languages = () => (
    <Block
        heading="Languages"
        content={<LanguagesContent languages={languages} />}
        smallHeadingMargin
        smallBottomMargin
    />
)

const LanguagesContent = ({ languages }: { languages: PersonalData['languages'] }) => {
    languages.sort((a, b) => b.description.localeCompare(a.description))
    return (
        <div className={styles.language}>
            {languages.map((language, index) => (
                <LanguageItem {...language} key={index} />
            ))}
        </div>
    )
}

const LanguageItem = ({ level, name, description }: PersonalData['languages'][number]) => {
    const size = `${Math.sqrt(level) / 2}cm`
    return (
        <div className={styles.languageItem}>
            <div
                className={styles.imageWrapper}
                style={{ height: size, width: size }}
            >
                <img className={styles.level} src={flagsMap[name]} alt="" />
            </div>
            <div className={styles.text}>
                <div className={styles.languageName}>{name}</div>
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    )
}

const flagsMap: Record<PersonalData['languages'][number]['name'], string> = {
    Polish: pl,
    English: gb,
    Unicorn: unicorn
}

export default Languages
