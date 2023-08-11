import React, { lazy } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import SharedLayout from '../SharedLayout/SharedLayout';
import styles from './App.module.css';
const Home = lazy(() => import('../../pages/Home/Home'));
const Movies = React.lazy(() => import('../../pages/Movies/Movies'));
const MovieDetails = React.lazy(() => import('../../pages/MovieDetails/MovieDetails'));
const Cast = React.lazy(() => import('../Cast/Cast'));
const Reviews = React.lazy(() => import('../Reviews/Reviews'));

const App = () => {
  return (
    <Router basename={'/goit-react-hw-05-movies'}>
      <div className={styles.loader}> 
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
