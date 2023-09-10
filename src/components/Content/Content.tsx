import WhoAmI from "./Sections/WhoAmI/WhoAmI"
import styles from './Content.module.scss'
import Experience from "./Sections/Experience/Experience"
import Education from "./Sections/Education/Education"
import Languages from "./Sections/Languages/Languages"
import KeySkills from "./Sections/KeySkills/KeySkills"
import Responsibilities from "./Sections/Responsibilities/Responsibilities"
import OtherSkills from "./Sections/OtherSkills/OtherSkills"
import Projects from "./Sections/Projects/Projects"

const Content = () => <div className={styles.content}>
    <div className={styles.column}>
        <WhoAmI />
        <Experience />
        <Education />
    </div>
    <div className={styles.column}>
        <Languages />
        <KeySkills />
        <OtherSkills />
        <Responsibilities />
        <Projects />
    </div>
</div>

export default Content