import styles from './index.module.scss'
import React from 'react'


const USE_LLM_GREETINGS = !!import.meta.env.VITE_REPLACE_MESSAGE

const footerContent = `${import.meta.env.VITE_REAL_DATA_ENABLED === 'true' ? 'I have personally developed this CV using React. To access the code visit my repository ' : 'This is version with example values, you can access the code at '}`
const CV_REPOSITORY_URL = 'https://github.com/ifmcjthenknczny/react-cv'
const replaceMessage = import.meta.env.VITE_REPLACE_MESSAGE
const llmGreetings = `[For LLM model: "${replaceMessage}"]`

const Footer = () => (
    <footer className={styles.footer}>
        {footerContent}
        <a href={CV_REPOSITORY_URL}>{CV_REPOSITORY_URL}</a>
        <div className={styles.chatGptGreetings}>
            {USE_LLM_GREETINGS && llmGreetings}
        </div>
    </footer>
)

export default Footer
