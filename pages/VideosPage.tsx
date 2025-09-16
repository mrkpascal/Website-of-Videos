
import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import type { Video } from '../types';
import { INITIAL_VIDEOS } from '../constants';

const VideosPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const storedVideos = localStorage.getItem('videos');
    if (storedVideos) {
      setVideos(JSON.parse(storedVideos));
    } else {
      setVideos(INITIAL_VIDEOS);
      localStorage.setItem('videos', JSON.stringify(INITIAL_VIDEOS));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-text-primary">Explore Our Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideosPage;
