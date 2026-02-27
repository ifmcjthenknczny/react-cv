import Block from '../../../utils/Block'
import React from 'react'
import { getData } from '@helpers/data'
import styles from './index.module.scss'

const { content } = await getData('whoAmI')

const whoAmIContent = <div className={styles.content}>{content}</div>

const WhoAmI = () => <Block heading="Who am I?" content={whoAmIContent} />

export default WhoAmI
