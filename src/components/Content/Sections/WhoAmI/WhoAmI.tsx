import { getData } from "../../../../helpers";
import Block from "../../Block";
import styles from './WhoAmI.module.scss'

const { content } = await getData('Content/Sections/WhoAmI')

const whoAmIContent = <div className={styles.content}>{content}</div>

const WhoAmI = () => <Block heading="Who am I?" content={whoAmIContent} />

export default WhoAmI