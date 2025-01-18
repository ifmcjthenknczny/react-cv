import React from 'react'

type Props = {
    className?: string
    date: [string, string]
}

const DatesFromTo = ({className, date}: Props) => <div className={className}>{date[0]} – {date[1]}</div>

export default DatesFromTo