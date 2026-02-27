import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React from 'react'
import { getData, PersonalData } from '../../../helpers/data'
import { getSocialIcon } from './iconMap'
import styles from './index.module.scss'

const socials = await getData('socials')

const Socials = () => (
    <div className={styles.socials}>
        {socials.map((social) => (
            <Social key={social.label} {...social} />
        ))}
    </div>
)

const Social = ({ type, label, url }: PersonalData['socials'][number]) => {
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
