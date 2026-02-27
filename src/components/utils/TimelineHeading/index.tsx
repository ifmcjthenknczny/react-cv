import React, { PropsWithChildren } from 'react'

import classNames from 'classnames'
import styles from './index.module.scss'
import { DateRange } from '@helpers/data'

type HeadingProps = PropsWithChildren<{
    importancy?: 'primary' | 'secondary'
}>

type DateProps = {
    date: DateRange
}

type Props = {
    primaryContent: React.ReactNode
    secondaryContent: React.ReactNode
} & DateProps

const DatesFromTo = ({ date }: DateProps) => (
    <div className={styles.date}>
        {date[0]} – {date[1]}
    </div>
)

function ElementHeading({ importancy = 'primary', children }: HeadingProps) {
    return (
        <div
            className={classNames(
                importancy === 'primary' && styles.headingPrimary,
                importancy === 'secondary' && styles.headingSecondary
            )}
        >
            {children}
        </div>
    )
}

export default function TimelineHeading({
    primaryContent,
    secondaryContent,
    date
}: Props) {
    return (
        <div className={styles.head}>
            <div className={styles.textContainer}>
                <ElementHeading>{primaryContent}</ElementHeading>
                <ElementHeading importancy="secondary">
                    {secondaryContent}
                </ElementHeading>
            </div>
            <DatesFromTo date={date} />
        </div>
    )
}
