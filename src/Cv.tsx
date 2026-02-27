import React, { useEffect, useRef } from 'react'

import Content from './components/Content'
import Footer from './components/Footer'
import Heading from './components/Heading'
import { printCV } from '@helpers/export'
import styles from './Cv.module.scss'

const Cv = () => {
    const timesRun = useRef(0)

    useEffect(() => {
        if (timesRun.current === 0) {
            printCV()
            timesRun.current += 1
        }
    }, [])

    return (
        <div id="CV">
            <div className={styles.curlyBraceUpper}>{'{'}</div>
            <div className={styles.cv}>
                <Heading />
                <Content />
                <Footer />
            </div>
            <div className={styles.curlyBraceDown}>{'}'}</div>
        </div>
    )
}

export default Cv
