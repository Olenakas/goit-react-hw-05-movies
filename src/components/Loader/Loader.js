import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles['loader-container']}> 
      <ThreeDots className={styles['loader-dots']} type="Oval" color="#3F51B5" height={80} width={80} />
    </div>
  );
};

export default Loader;


