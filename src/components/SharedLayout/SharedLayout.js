import React, {Suspense} from 'react';
import {Link, Outlet} from 'react-router-dom';
import styles from './SharedLayout.module.css'
import Loader from "../Loader/Loader";

const SharedLayout = () => {
  return (
    <div>
      <div className={styles.header}> 
        <Link className={styles.button} to="/">
          Home
        </Link>
        <Link className={styles.button} to="/movies">
          Movies
        </Link>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default SharedLayout;






