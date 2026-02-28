import Block from '../../../utils/Block'
import { getData } from '@helpers/data'
import styles from './index.module.scss'
import React from 'react'


const { content } = await getData('whoAmI')

const whoAmIContent = <div className={styles.content}>{content}</div>

const WhoAmI = () => <Block heading="Who am I?" content={whoAmIContent} />

export default WhoAmI
