import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../services/api';
import styles from './Cast.module.css'; 

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const castData = await getMovieCast(movieId);
        setCast(castData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={styles['cast-container-wrap']}>
      <h2 className={styles['title']}>Сompound</h2>
      <div className={styles['cast-container']}>
        {cast.map((actor) => (
          <div className={styles['actor-card']} key={actor.id}>
            {actor.profile_path ? (
              <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} />
            ) : (
              <div className={styles['no-photo-available']}>No photo</div>
            )}
            <div className={styles['name']}>{actor.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;

