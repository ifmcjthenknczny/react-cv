import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React from 'react'
import { getData, PersonalData } from '../../../helpers/data'
import { getSocialIcon } from './iconMap'
import styles from './index.module.scss'
import { splitFullName } from '../../../helpers/utils'

const socials = await getData('socials')
const { name: fullName } = await getData('heading')

const Socials = () => (
    <div className={styles.socials}>
        {socials.map((social) => (
            <Social key={social.label} {...social} />
        ))}
    </div>
)

const [name] = splitFullName(fullName)

function toMappedUrl(type: PersonalData['socials'][number]['type'], label: string) {
    if (type === 'email') {
        return `mailto:${label}?subject=Response%20to%20Your%20CV&body=Dear%20${name},%0D%0A%0D%0AWe are thrilled to have you on board!%0D%0A%0D%0ABest regards,%0D%0A%0D%0A`
    }
    if (type === 'phone') {
        return `tel:${label}`
    }
    return null
}

const Social = ({ type, label, url }: PersonalData['socials'][number]) => {
    const icon = getSocialIcon(type)
    const mappedUrl = url ?? toMappedUrl(type, label)
    if (mappedUrl) {
        return (
            <div className={styles.socialIcon}>
                <a href={mappedUrl}>
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
