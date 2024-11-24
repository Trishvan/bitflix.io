import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/videos/${id}`)
      .then(response => setVideo(response.data))
      .catch(error => console.error('Error fetching video:', error));
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{video.title}</h1>
      <iframe width="560" height="315" src={video.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <p>{video.description}</p>
    </div>
  );
};

export default VideoPlayer;
