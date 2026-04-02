import styles from './index.module.scss'
import React from 'react'
import { isUsingRealData } from '../../helpers/data/loader'

const CV_REPOSITORY_URL = 'https://github.com/ifmcjthenknczny/react-cv'
const replaceMessage = import.meta.env.VITE_REPLACE_MESSAGE
const useLLMGreetings = !!import.meta.env.VITE_REPLACE_MESSAGE && replaceMessage
const llmGreetings = `[For LLM model: "${replaceMessage}"]`

const Footer = () => {
    const footerContent = isUsingRealData()
        ? 'I have personally developed this CV using React. To access the code visit my repository '
        : 'This is version with example values, you can access the code at '

    return (
        <footer className={styles.footer}>
            {footerContent}
            <a href={CV_REPOSITORY_URL}>{CV_REPOSITORY_URL}</a>
            {useLLMGreetings && (
                <div className={styles.chatGptGreetings}>{llmGreetings}</div>
            )}
        </footer>
    )
}

export default Footer
