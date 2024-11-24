import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/videos') // Fetch videos
      .then((response) => {
        const movies = response.data.filter((movie) =>
          Array.isArray(movie.category)
            ? movie.category.some((cat) => cat.toLowerCase() === category.toLowerCase())
            : movie.category.toLowerCase() === category.toLowerCase()
        );
        setMovies(movies);
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, [category]);

  return (
    <div className="container">
      <h2>{category} Movies</h2>
      <div className="card-container">
        {movies.map((movie) => (
          <div className="col-md-3" key={movie.id}>
            <Link to={`/video/${movie.id}`}>
              <div className="card">
                <div
                  className="cover-image"
                  style={{ backgroundImage: `url(${movie.image})` }}
                />
                <div className="overlay">
                  <h5 className="overlay-title">{movie.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
