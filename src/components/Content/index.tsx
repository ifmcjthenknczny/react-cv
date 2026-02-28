import Education from './Sections/Education'
import Experience from './Sections/Experience'
import KeySkills from './Sections/KeySkills'
import Languages from './Sections/Languages'
import OtherSkills from './Sections/OtherSkills'
import Projects from './Sections/Projects'
import Responsibilities from './Sections/Responsibilities'
import WhoAmI from './Sections/WhoAmI'
import styles from './index.module.scss'
import Column from '../utils/Column'
import React from 'react'

const Content = () => (
    <div className={styles.content}>
        <Column>
            <WhoAmI />
            <Experience />
            <Education />
        </Column>
        <Column>
            <Languages />
            <KeySkills />
            <OtherSkills />
            <Responsibilities />
            <Projects />
        </Column>
    </div>
)

export default Content
