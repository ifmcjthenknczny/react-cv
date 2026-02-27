import {
    faEnvelope,
    faMapMarkerAlt,
    faPhone
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { PersonalData } from '@helpers/data'

type SocialType = PersonalData['socials'][number]['type']

const iconByKey: Record<SocialType, IconDefinition> = {
    'map': faMapMarkerAlt,
    'github': faGithub,
    'email': faEnvelope,
    'phone': faPhone,
    'linkedin': faLinkedin
}

export function getSocialIcon(type: SocialType): IconDefinition {
    const icon = iconByKey[type]
    if (!icon) {
        throw new Error(`Unknown social icon type: ${type}. Known: ${Object.keys(iconByKey).join(', ')}`)
    }
    return icon
}
