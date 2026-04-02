import Block from '../../../utils/Block'
import gb from '../../../../assets/gb64.png'
import { getData, PersonalData } from '@helpers/data'
import pl from '../../../../assets/pl64.png'
import styles from './index.module.scss'
import unicorn from '../../../../assets/unicorn64.png'
import React from 'react'

const languages = await getData('languages')

const Languages = () => (
    <Block
        heading="Languages"
        content={<LanguagesContent languages={languages} />}
        smallHeadingMargin
        smallBottomMargin
    />
)

const LanguagesContent = ({
    languages
}: {
    languages: PersonalData['languages']
}) => {
    const sortedLanguages = [...languages].sort((a, b) =>
        b.description.localeCompare(a.description)
    )
    const maxFlagSize = `${Math.max(...sortedLanguages.map((l) => Math.sqrt(l.level) / 2))}cm`
    return (
        <div
            className={styles.language}
            style={{ ['--flag-row-height' as string]: maxFlagSize }}
        >
            {sortedLanguages.map((language, index) => (
                <LanguageItem {...language} key={index} />
            ))}
        </div>
    )
}

const LanguageItem = ({
    level,
    name,
    description
}: PersonalData['languages'][number]) => {
    const size = `${Math.sqrt(level) / 2}cm`
    return (
        <div
            className={styles.languageItem}
            style={{ ['--wrapper-height' as string]: size }}
        >
            <div className={styles.flagRow}>
                <div
                    className={styles.imageWrapper}
                    style={{ height: size, width: size }}
                >
                    <img className={styles.level} src={flagsMap[name]} alt="" />
                </div>
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
