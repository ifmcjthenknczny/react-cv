import React, { useEffect, useState } from 'react'

import Block from '../../Block'
import { fetchRandomPokemonNames } from './pokemon'
import { getData } from '../../../../helpers/data'
import { removeElements } from '../../../../helpers/utils'
import styles from './OtherSkills.module.scss'

const {
    tech,
    excludedTech = [],
    synonyms = []
} = await getData('Content/Sections/OtherSkills')

// highly reccomended to set it to more than 0
const randomPokemonAddCount =
    import.meta.env.VITE_REAL_DATA_ENABLED === 'true' ? 0 : 6
const LINK = '-'

const OtherSkills = () => (
    <Block
        heading="Other familiar tech"
        content={<TechContent tech={tech} synonyms={synonyms} />}
    />
)

export default OtherSkills

const TechContent = ({ tech }: { tech: string[]; synonyms: string[] }) => {
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
            {removeElements(joinedTech, [...excludedTech]).map(
                (techName, i) => (
                    <span key={i} className={styles.tech}>
                        {normalizeTechName(techName)}
                    </span>
                )
            )}
            {(synonyms as string[]).map((synonym, i) => (
                <span key={i} className={styles.techSynonym}>
                    {synonym}
                </span>
            ))}
        </div>
    )
}
const normalizeTechName = (techName: string) =>
    `${techName.toLowerCase().split(' ').join(LINK)} `
