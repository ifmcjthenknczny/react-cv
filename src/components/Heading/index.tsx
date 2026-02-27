import { getData, getPhoto } from '@helpers/data'

import React from 'react'
import Socials from './Socials'
import classNames from 'classnames'
import { splitFullName } from '@helpers/utils'
import styles from './index.module.scss'

const { name, position } = await getData('heading')
const photoUrl = await getPhoto()

const Heading = () => (
    <header className={styles.heading}>
        <div className={styles.infoAndPhoto}>
            <div className={styles.mainInfo}>
                <div className={styles.name}>
                    {splitFullName(name).map((s, i) => (
                        <div
                            key={i}
                            className={classNames(styles.line, styles.nameLine)}
                        >
                            {s}
                        </div>
                    ))}
                </div>
                <div className={styles.position}>
                    <div
                        className={classNames(styles.line, styles.positionName)}
                    >
                        {position}
                    </div>
                </div>
            </div>
            <div className={styles.photoContainer}>
                <img src={photoUrl} alt={`${name}`} className={styles.photo} />
            </div>
        </div>
        <Socials />
    </header>
)

export default Heading
