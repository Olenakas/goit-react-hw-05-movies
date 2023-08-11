import React, { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import styles from './MovieDetails.module.css'; 
import Loader from '../../components/Loader/Loader';
import { getMovieDetails } from '../../services/api'; 

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className={styles['movie-details']}>
      <Link className={styles['back-button']} to={location.state?.from || '/'}>
        Back
      </Link>
      {movieDetails && (
        <div className={styles['movie-content']}>
          <div className={styles['movie-content-wrap']}>
                        <div className={styles['movie-image-container']}>
              {movieDetails.poster_path ? (
                <img
                  className={styles['movie-image']}
                  src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                />
              ) : (
                <div className="no-photo">No photo</div>
              )}
            </div>
            <div className={styles['movie-text-container']}>
              <h2 className={styles['movie-title']}>{movieDetails.title}</h2>
              <p className={styles['movie-info']}>Release Date: {movieDetails.release_date}</p>
              <p className={styles['movie-info']}>Overview: {movieDetails.overview}</p>
              <p className={styles['movie-info']}>Rating: {movieDetails.vote_average}</p>
            </div> 
          </div>    
            <ul className={styles['links-container']}>
              <li>
                <Link className={styles['movie-info']} to="cast" state={{ ...location.state }}>
                  Cast
                </Link>
              </li>
              <li>
                <Link className={styles['movie-info']} to="reviews" state={{ ...location.state }}>
                  Reviews
                </Link>
              </li>
            </ul>       
        </div>
      )}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;

