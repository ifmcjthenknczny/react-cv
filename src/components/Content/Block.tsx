import styles from './Block.module.scss'
import React, { ReactNode } from 'react'

const Block = ({ heading, content }: { heading: string, content: string | ReactNode }) => <div className={styles.block}>
    <div className={styles.heading}>{heading}</div>
    <div className={styles.content}>{content}</div>
</div>

export default Block