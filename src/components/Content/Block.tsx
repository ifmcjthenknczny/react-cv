import React, { ReactNode } from 'react'

import classNames from 'classnames'
import styles from './Block.module.scss'

type Props = {
    heading: string
    content: string | ReactNode
    smallHeadingMargin?: true
    smallBottomMargin?: true
}

const Block = ({
    heading,
    content,
    smallHeadingMargin,
    smallBottomMargin
}: Props) => (
    <div
        className={classNames(
            styles.block,
            smallBottomMargin && styles.smallBottomMargin
        )}
    >
        <div
            className={classNames(
                styles.heading,
                smallHeadingMargin && styles.smallHeadingMargin
            )}
        >
            {heading}
        </div>
        <div className={styles.content}>{content}</div>
    </div>
)

export default Block
