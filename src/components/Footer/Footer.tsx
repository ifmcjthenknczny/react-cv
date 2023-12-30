import { REAL_DATA_ENABLED } from 'flag'
import React from 'react'
import styles from './Footer.module.scss'

const Footer = () => <footer className={styles.footer}>{footerContent}<a href={cvUrl}>{cvUrl}</a></footer>

const footerContent = `CV written in React with Typescript. ${ REAL_DATA_ENABLED ? 'To access the code with example values visit ' : 'This is version with example values, access code at '}`
const cvUrl = 'https://github.com/ifmcjthenknczny/react-cv'

export default Footer