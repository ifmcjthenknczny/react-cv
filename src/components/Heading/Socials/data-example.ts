import {
    faEnvelope,
    faMapMarkerAlt,
    faPhone,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import { getData } from '../../../helpers/data'
import { splitFullName } from '../../../helpers/utils'

const { name: fullName } = await getData('Heading')
const [name] = splitFullName(fullName)

const mail = 'rainbowenchanter@unicornmail.com'
const phone = '+48 694 202 137'

const mailto = `mailto:${mail}?subject=Enchanted%20Response%20to%20Your%20CV&body=Dear%20${name},%0D%0A%0D%0A`

const data = {
    socials: [
        {
            type: faMapMarkerAlt,
            label: 'Łódź, Poland',
            url: 'https://www.google.com/maps/place/Pomnik+Jednoro%C5%BCca/@51.7589821,19.4582684,17z/data=!3m1!4b1!4m6!3m5!1s0x471a35e0f85637a7:0xf421c1eaa70e5598!8m2!3d51.7589821!4d19.4582684!16s%2Fg%2F11hyj8p973?entry=ttu',
        },
        {
            type: faGithub,
            label: 'enchantingcoder',
            url: 'https://github.com/enchantingcoder',
        },
        {
            type: faEnvelope,
            label: mail,
            url: mailto,
        },
        {
            type: faPhone,
            label: phone,
            url: `tel:${phone}`,
        },
        {
            type: faLinkedin,
            label: 'rainbowenchanter',
            url: 'https://www.linkedin.com/in/rainbowenchanter',
        },
    ],
}

export default data
