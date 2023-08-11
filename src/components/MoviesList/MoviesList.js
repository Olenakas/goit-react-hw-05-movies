import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MoviesList.module.css';
import PropTypes from 'prop-types';

export const MoviesList = ({ movies }) => {
  const { pathname, search } = useLocation();

  return (
    <div className={styles['movies-list']}>
      {movies.map((movie) => (
        <div key={movie.id} className={styles['movie-item']}>
          <Link to={`/movies/${movie.id}`} state={{ from: pathname + search }} className={styles['movie-link']}>
            <div className={styles['image-container']}>
              {movie.poster_path ? (
                <img className={styles['movie-poster']} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              ) : (
                <div className={styles['no-photo']}>No photo</div>
              )}
            </div>
            <p className={styles['movie-title']}>{movie.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};
