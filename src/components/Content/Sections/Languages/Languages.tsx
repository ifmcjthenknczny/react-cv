import Block from '../../Block'
import React from 'react'
import gb from '../../../../assets/gb64.png'
import { getData } from '../../../../helpers/data'
import pl from '../../../../assets/pl64.png'
import styles from './Languages.module.scss'
import unicorn from '../../../../assets/unicorn64.png'

const { languages } = await getData('Content/Sections/Languages')

const Languages = () => (
    <Block
        heading="Languages"
        content={<LanguagesContent languages={languages} />}
    />
)

export default Languages

type Language = {
    level: 1 | 2 | 3 | 4 | 5
    name: string
    description: string
}

const LanguagesContent = ({ languages }: { languages: Language[] }) => {
    languages.sort((a, b) => b.description.localeCompare(a.description))
    return (
        <div className={styles.language}>
            {languages.map((language, index) => (
                <LanguageItem {...language} key={index} />
            ))}
        </div>
    )
}

const LanguageItem = ({ level, name, description }: Language) => {
    const size = `${Math.sqrt(level) / 2}cm`
    return (
        <div className={styles.languageItem}>
            <div
                className={styles.imageWrapper}
                style={{ height: size, width: size }}
            >
                <img className={styles.level} src={flags[name]} alt="" />
            </div>
            <div className={styles.text}>
                <div className={styles.languageName}>{name}</div>
                <div className={styles.description}>{description}</div>
            </div>
        </div>
    )
}

const flags: Record<Language['name'], string> = {
    Polish: pl,
    English: gb,
    Unicorn: unicorn
}
