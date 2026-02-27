import React, { useEffect, useState } from 'react'

import Block from '../../../utils/Block'
import { fetchRandomPokemonNames } from '../../../../helpers/pokemon'
import { getData } from '../../../../helpers/data'
import { removeElements } from '../../../../helpers/utils'
import styles from './index.module.scss'

const {
    tech,
    excludedTech = [],
    synonyms,
    potential
} = await getData('otherSkills')

const keySkills = await getData('keySkills')

const allExcludedTech = [...keySkills.flatMap((skill) => skill.name), ...keySkills.flatMap((skill) => skill.synonym), ...(excludedTech ?? [])].filter(Boolean).flatMap((tech) => tech!.toLowerCase())

// highly reccomended to set it to more than 0
const randomPokemonAddCount =
    import.meta.env.VITE_RANDOM_POKEMON_ADD_COUNT || 0
const LINK_SYMBOL = '-'

const normalizeTechName = (techName: string) => {
    return `${techName.toLowerCase().split(' ').join(LINK_SYMBOL)} `
}

const OtherSkills = () => (
    <Block
        heading="Other familiar tech"
        content={<TechContent tech={tech} synonyms={synonyms} potential={potential} />}
    />
)

const TechContent = ({ tech }: { tech: string[]; synonyms?: string[], potential?: string[] }) => {
    const [joinedTech, setJoinedTech] = useState(
        tech.map((t) => t.toLocaleLowerCase())
    )
    async function addRandomPokemonNames() {
        if (!randomPokemonAddCount) {
            return
        }
        const randomPokemans = await fetchRandomPokemonNames(
            randomPokemonAddCount
        )
        const newTech = [...joinedTech, ...randomPokemans].sort()
        setJoinedTech(newTech)
    }

    useEffect(() => {
        addRandomPokemonNames()
    }, [])

    joinedTech.sort()
    return (
        <div className={styles.techContent}>
            {removeElements(joinedTech, [...allExcludedTech]).map(
                (techName, i) => (
                    <span key={i} className={styles.tech}>
                        {normalizeTechName(techName)}
                    </span>
                )
            )}
            {([...(synonyms ?? []), ...(potential ?? [])]).map((name, i) => (
                <span key={i} className={styles.techSynonym}>
                    {name}
                </span>
            ))}
        </div>
    )
}

export default OtherSkills