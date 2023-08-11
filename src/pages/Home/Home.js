import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/api';
import styles from './Home.module.css';
import moviesListStyles from '../../components/MoviesList/MoviesList.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTrendingMovies();
      setTrendingMovies(result.map((m) => ({ ...m, title: m.title || m.name })));
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Trending Movies Today</h2>
      <div className={moviesListStyles['movies-list']}>
        {trendingMovies.map((movie) => (
          <div key={movie.id} className={moviesListStyles['movie-item']}>            
            <Link to={`/movies/${movie.id}`} className={moviesListStyles['movie-link']}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className={moviesListStyles['movie-poster']} 
              />
              <h3 className={moviesListStyles['movie-title']}>{movie.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
