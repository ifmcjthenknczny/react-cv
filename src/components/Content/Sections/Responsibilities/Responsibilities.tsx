import 'chartjs-plugin-datalabels'

import { ArcElement, Chart as ChartJS, ChartOptions, Legend, Tooltip } from 'chart.js'

import Block from '../../Block'
import { Doughnut } from 'react-chartjs-2'
import { OPACITY } from '../KeySkills/KeySkills'
import React from 'react'
import { getData } from '../../../../helpers/data'
import styles from './Responsibilities.module.scss'

const { companyName, activities } = await getData('Content/Sections/Responsibilities') as { companyName: string; activities: Activity[] }

activities.sort((a, b) => {
    if (a.label.toLowerCase() === 'other') {
        return 1
    }
    else if (b.label.toLowerCase() === 'other') {
        return -1
    }
    return b.percent - a.percent
})

const Responsibilities = () => <Block heading={`My Responsibilities (${companyName})`} content={<Chart />} />

ChartJS.register(ArcElement, Legend, Tooltip)

type Activity = {
    label: string
    percent: number
}

const Chart = () => <div className={styles.content}>
    <div className={styles.chartWrapper}>
        <Doughnut className={styles.chart} data={data} options={config} />
    </div>
</div>

const config: ChartOptions<'doughnut'> = {
    plugins: {
        legend: {
            position: 'right',
            labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                color: 'black',
                font: {
                    size: 12,
                    family: 'Raleway',
                },
            }
        },
        datalabels: {
            formatter: (value: number) => {
                return `${value}%`
            }
        }
    },
}

const colors = (opacity: number) => [
    `rgba(255, 99, 132, ${opacity})`,
    `rgba(255, 206, 86, ${opacity})`,
    `rgba(54, 162, 235, ${opacity})`,
    `rgba(255, 159, 64, ${opacity})`,
    `rgba(75, 192, 192, ${opacity})`,
    `rgba(153, 102, 255, ${opacity})`,
    `rgba(204, 154, 171, ${opacity})`,
]

const data = {
    labels: activities.map(({ label }) => label),
    datasets: [
        {
            label: '% of time',
            data: activities.map(({ percent }) => percent),
            backgroundColor: colors(OPACITY),
            borderColor: colors(1),
            borderWidth: 1,
        },
    ]
}

export default Responsibilities
