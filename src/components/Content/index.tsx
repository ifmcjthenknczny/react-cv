import Education from './Sections/Education/Education'
import Experience from './Sections/Experience'
import KeySkills from './Sections/KeySkills'
import Languages from './Sections/Languages'
import OtherSkills from './Sections/OtherSkills'
import Projects from './Sections/Projects'
import React from 'react'
import Responsibilities from './Sections/Responsibilities'
import WhoAmI from './Sections/WhoAmI'
import styles from './index.module.scss'

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
