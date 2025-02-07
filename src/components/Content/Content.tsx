import Education from './Sections/Education/Education'
import Experience from './Sections/Experience/Experience'
import KeySkills from './Sections/KeySkills/KeySkills'
import Languages from './Sections/Languages/Languages'
import OtherSkills from './Sections/OtherSkills/OtherSkills'
import Projects from './Sections/Projects/Projects'
import React from 'react'
import Responsibilities from './Sections/Responsibilities/Responsibilities'
import WhoAmI from './Sections/WhoAmI/WhoAmI'
import styles from './Content.module.scss'

const Content = () => (
    <div className={styles.content}>
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
)

export default Content
