import {
    faEnvelope,
    faMapMarkerAlt,
    faPhone
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

const iconByKey: Record<string, IconDefinition> = {
    'map-marker-alt': faMapMarkerAlt,
    'github': faGithub,
    'envelope': faEnvelope,
    'phone': faPhone,
    'linkedin': faLinkedin
}

export function getSocialIcon(type: string): IconDefinition {
    const icon = iconByKey[type]
    if (!icon) {
        throw new Error(`Unknown social icon type: ${type}. Known: ${Object.keys(iconByKey).join(', ')}`)
    }
    return icon
}
