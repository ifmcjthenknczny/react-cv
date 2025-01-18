import React, {useEffect, useState} from 'react'

import Block from '../../Block'
import { fetchRandomPokemonNames } from './pokemon'
import { getData } from '../../../../helpers/data'
import { removeDuplicates } from '../../../../helpers/utils'
import styles from './OtherSkills.module.scss'

const { tech, excludedTech = [] } = await getData('Content/Sections/OtherSkills')

// highly reccomended to set it to more than 0
const randomPokemonAddCount = 0
const LINK = '-'

const OtherSkills = () => <Block heading="Other familiar tech" content={<TechContent tech={tech} />} />

export default OtherSkills

const TechContent = ({ tech }: { tech: string[] }) => {
    const [joinedTech, setJoinedTech] = useState(tech.map(t => t.toLocaleLowerCase()))
    async function addRandomPokemonNames() {
        if (!randomPokemonAddCount) {
            return
        }
        const randomPokemans = await fetchRandomPokemonNames(randomPokemonAddCount)
        const newTech = [...joinedTech, ...randomPokemans].sort()
        setJoinedTech(newTech)
    }

    useEffect(() => {
        addRandomPokemonNames()
    }, [])

    joinedTech.sort()
    return <div className={styles.techContent}>
        {removeDuplicates(joinedTech, [...excludedTech]).map((t, i) => <span key={i} className={styles.tech}>{normalizeTechName(t)}</span>)}
    </div>
}
const normalizeTechName = (techName: string) => `${techName.toLowerCase().split(' ').join(LINK)} `
