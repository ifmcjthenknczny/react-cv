import {
    FontAwesomeIcon,
    FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'

import React from 'react'
import { Social as SocialType } from './types'
import { getData } from '../../../helpers/data'
import styles from './Socials.module.scss'

const { socials } = (await getData('Heading/Socials')) as {
    socials: SocialType[]
}

const Socials = () => (
    <div className={styles.socials}>
        {socials.map((social) => (
            <Social key={social.label} {...social} />
        ))}
    </div>
)

const Social = ({ type, label, url }: SocialType) => {
    if (url) {
        return (
            <div className={styles.socialIcon}>
                <a href={url}>
                    <FontAwesomeIcon
                        icon={type as FontAwesomeIconProps['icon']}
                    />
                    <span className={styles.label}>{label}</span>
                </a>
            </div>
        )
    }
    return (
        <div className={styles.socialIcon}>
            <FontAwesomeIcon icon={type as FontAwesomeIconProps['icon']} />
            <span className={styles.label}>{label}</span>
        </div>
    )
}

export default Socials
