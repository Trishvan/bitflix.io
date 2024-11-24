import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Import external CSS

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/videos')
      .then((response) => setVideos(response.data))
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  return (
    <div className="container">
      <h1>Home</h1>
      <div className="card-container shadow-lg">
        {videos.map((video) => (
          <div className="col-3 col-md-3" key={video.id}> {/* Adjust column size here */}
            {/* Link wrapping the card */}
            <Link to={`/video/${video.id}`} className="card-link">
              <div className="card shadow-lg">
                <div
                  className="cover-image"
                  style={{ backgroundImage: `url(${video.image})` }}
                />
                <div className="overlay">
                  <h5 className="overlay-title">{video.title}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
