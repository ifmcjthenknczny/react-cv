import React from 'react';
import Heading from './components/Heading/Heading';
import styles from './Cv.module.scss';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';

function Cv() {
  return (
    <>
      <div className={styles.curlyBraceUpper}>{"{"}</div>
      <div className={styles.cv}>
        <Heading />
        <Content />
        <Footer />
      </div>
      <div className={styles.curlyBraceDown}>{"}"}</div>
    </>
  );
}

export default Cv;
