import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MoviesList } from '../../components/MoviesList/MoviesList';
import { searchMovies } from '../../services/api';
import styles from './Movies.module.css'; 

const Movies = () => {
  const [moviesByQuery, setMoviesByQuery] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleMovies, setVisibleMovies] = useState(20); 

  const query = searchParams.get('query') || '';

  const handleInputChange = (event) => {
    setSearchParams({ query: event.target.value });
  };

  const handleSearch = async () => {
    const result = await searchMovies(query);
    setMoviesByQuery(result);
    setVisibleMovies(20); 
  };

  useEffect(() => {
    const search = async () => {
      const result = await searchMovies(query);
      setMoviesByQuery(result);
    };
    search();
  }, [query]);

  const handleMoreClick = () => {
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 20);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Movie Search</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}>
          Search
        </button>
      </div>
      <MoviesList movies={moviesByQuery.slice(0, visibleMovies)} />
      {moviesByQuery.length > visibleMovies && (
        <button onClick={handleMoreClick} className={styles.more}>
          More
        </button>
      )}
    </div>
  );
};

export default Movies;





