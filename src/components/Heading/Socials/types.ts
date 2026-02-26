import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type SocialFromData = {
    type: string
    label: string
    url?: string
}

export type Social = {
    type: IconDefinition
    label: string
    url?: string
}
