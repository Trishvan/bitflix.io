import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Reuse the same styles as Home

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/videos') // Fetch videos from the backend
      .then((response) => {
        const movies = response.data;

        // Extract unique categories from the videos
        const uniqueCategories = Array.from(
          new Set(
            movies.flatMap((movie) =>
              Array.isArray(movie.category) ? movie.category : [movie.category]
            )
          )
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div className="container">
      <h2>Categories</h2>
      <div className="cat-card-container">
        {categories.map((category, index) => (
          <div className="col-md-3" key={index}>
            <Link to={`/categories/${encodeURIComponent(category)}`}>
              <div className="card">
                <div className="cover-image category-card">
                  <h5 className="category-title">{category}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
