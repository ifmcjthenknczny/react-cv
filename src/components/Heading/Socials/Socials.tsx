import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import styles from './Socials.module.scss'
import { getData } from "helpers"
import { Social as SocialType } from "../../../types"

const { socials } = (await getData('Heading/Socials')) as { socials: SocialType[] }

const Socials = () => <div className={styles.socials}>
    {socials.map(social => <Social key={social.label} {...social} />)}
</div>

const Social = ({ type, label, url }: SocialType) => {
    if (url) {
        return <div className={styles.socialIcon}><a href={url}><FontAwesomeIcon icon={type as FontAwesomeIconProps['icon']} /><span className={styles.label}>{label}</span></a></div>
    }
    return <div className={styles.socialIcon}><FontAwesomeIcon icon={type as FontAwesomeIconProps['icon']} /><span className={styles.label}>{label}</span></div>
}

export default Socials

