import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React from 'react'
import { getData } from '../../../helpers/data'
import { getSocialIcon } from './iconMap'
import { SocialFromData } from './types'
import styles from './Socials.module.scss'

const { socials } = (await getData('Heading/Socials')) as {
    socials: SocialFromData[]
}

const Socials = () => (
    <div className={styles.socials}>
        {socials.map((social) => (
            <Social key={social.label} {...social} />
        ))}
    </div>
)

const Social = ({ type, label, url }: SocialFromData) => {
    const icon = getSocialIcon(type)
    if (url) {
        return (
            <div className={styles.socialIcon}>
                <a href={url}>
                    <FontAwesomeIcon icon={icon} />
                    <span className={styles.label}>{label}</span>
                </a>
            </div>
        )
    }
    return (
        <div className={styles.socialIcon}>
            <FontAwesomeIcon icon={icon} />
            <span className={styles.label}>{label}</span>
        </div>
    )
}

export default Socials
