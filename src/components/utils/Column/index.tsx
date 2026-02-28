import styles from './index.module.scss'
import React, {PropsWithChildren} from 'react'

type Props = PropsWithChildren<unknown>;

const Column = ({children}: Props) => <div className={styles.column}>
    {children}
</div>

export default Column