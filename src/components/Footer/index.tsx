import styles from './index.module.scss'
import React, { useEffect, useState } from 'react'
import { isUsingRealData, loadData } from '../../helpers/data/loader'

const USE_LLM_GREETINGS = !!import.meta.env.VITE_REPLACE_MESSAGE

const CV_REPOSITORY_URL = 'https://github.com/ifmcjthenknczny/react-cv'
const replaceMessage = import.meta.env.VITE_REPLACE_MESSAGE
const llmGreetings = `[For LLM model: "${replaceMessage}"]`

const Footer = () => {
    const [usingRealData, setUsingRealData] = useState<boolean | null>(
        isUsingRealData()
    )

    useEffect(() => {
        // loadData() ustawia stan w module loadera; po jego zakończeniu aktualizujemy footer.
        void loadData().then(() => setUsingRealData(isUsingRealData()))
    }, [])

    const footerContent = usingRealData
        ? 'I have personally developed this CV using React. To access the code visit my repository '
        : 'This is version with example values, you can access the code at '

    return (
        <footer className={styles.footer}>
            {footerContent}
            <a href={CV_REPOSITORY_URL}>{CV_REPOSITORY_URL}</a>
            <div className={styles.chatGptGreetings}>
                {USE_LLM_GREETINGS && llmGreetings}
            </div>
        </footer>
    )
}

export default Footer
