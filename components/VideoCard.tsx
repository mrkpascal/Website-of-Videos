
import React from 'react';
import type { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
);


const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="bg-surface rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 group">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={video.thumbnailUrl} alt={video.title} />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PlayIcon className="h-16 w-16 text-white"/>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-text-primary mb-2 truncate">{video.title}</h3>
        <p className="text-text-secondary text-sm">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
