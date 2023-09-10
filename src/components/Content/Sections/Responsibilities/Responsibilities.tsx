import Block from "../../Block"
import { Chart as ChartJS, ChartOptions, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styles from './Responsibilities.module.scss'
import 'chartjs-plugin-datalabels'
import { OPACITY } from "../KeySkills/KeySkills";
import { getData } from "../../../../helpers";
import { ExperienceType as Experience } from "../Experience/Experience";

const { experiences } = await getData('Content/Sections/Experience') as { experiences: Experience[] }

const Responsibilities = () => <Block heading={`My Responsibilities (${experiences[0].company})`} content={<Chart />} />

ChartJS.register(ArcElement, Legend, Tooltip);

type Activity = {
    label: string
    percent: number
}

const Chart = () => <div className={styles.content}><div className={styles.chartWrapper}><Doughnut className={styles.chart} data={data} options={config} /></div></div>

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
    }
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

const { activities } = await getData('Content/Sections/Responsibilities') as { activities: Activity[] }

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
    ],
};

export default Responsibilities
