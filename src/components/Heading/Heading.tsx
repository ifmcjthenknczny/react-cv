import { getData,getPhoto, splitFullName } from '../../helpers'
import styles from "./Heading.module.scss";
import Socials from './Socials/Socials';
import classNames from 'classnames';

const { name, position } = await getData('Heading')
const photoUrl = await getPhoto()

const Heading = () => <header className={styles.heading}>
    <div className={styles.infoAndPhoto}>
        <div className={styles.mainInfo}>
            <div className={styles.name}>
                {splitFullName(name).map((s, i) => <div key={i} className={classNames(styles.line, styles.nameLine)}>{s}</div>)}
            </div>
            <div className={styles.position}>
                <div className={classNames(styles.line, styles.positionName)}>{position}</div>
            </div>
        </div>
        <div className={styles.photoContainer}>
            <img src={photoUrl} alt={`${name}`} className={styles.photo} />
        </div>
    </div>
    <Socials />
</header>


export default Heading