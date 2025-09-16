
import React, { useState, useEffect } from 'react';
import type { Video, JobPosting } from '../types';
import { INITIAL_VIDEOS, INITIAL_JOB_POSTING } from '../constants';

const AdminPage: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [job, setJob] = useState<JobPosting>(INITIAL_JOB_POSTING);

    // Video form state
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDesc, setVideoDesc] = useState('');
    const [videoThumb, setVideoThumb] = useState('');

    useEffect(() => {
        const storedVideos = localStorage.getItem('videos');
        setVideos(storedVideos ? JSON.parse(storedVideos) : INITIAL_VIDEOS);

        const storedJob = localStorage.getItem('jobPosting');
        setJob(storedJob ? JSON.parse(storedJob) : INITIAL_JOB_POSTING);
    }, []);

    const handleAddVideo = (e: React.FormEvent) => {
        e.preventDefault();
        const newVideo: Video = {
            id: Date.now().toString(),
            title: videoTitle,
            description: videoDesc,
            thumbnailUrl: videoThumb || `https://picsum.photos/seed/${Date.now()}/600/400`,
        };
        const updatedVideos = [...videos, newVideo];
        setVideos(updatedVideos);
        localStorage.setItem('videos', JSON.stringify(updatedVideos));
        setVideoTitle('');
        setVideoDesc('');
        setVideoThumb('');
    };

    const handleDeleteVideo = (id: string) => {
        const updatedVideos = videos.filter(v => v.id !== id);
        setVideos(updatedVideos);
        localStorage.setItem('videos', JSON.stringify(updatedVideos));
    };

    const handleJobUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('jobPosting', JSON.stringify(job));
        alert('Job posting updated successfully!');
    };

    const handleJobChange = <K extends keyof JobPosting,>(field: K, value: JobPosting[K]) => {
        setJob(prev => ({...prev, [field]: value}));
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8 text-yellow-400">Admin Dashboard</h1>

            {/* Video Management */}
            <div className="bg-surface p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Manage Videos</h2>
                <form onSubmit={handleAddVideo} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <input type="text" placeholder="Video Title" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} required className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"/>
                    <input type="text" placeholder="Description" value={videoDesc} onChange={e => setVideoDesc(e.target.value)} required className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"/>
                    <input type="text" placeholder="Thumbnail URL (optional)" value={videoThumb} onChange={e => setVideoThumb(e.target.value)} className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"/>
                    <button type="submit" className="md:col-span-3 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded transition-colors">Add Video</button>
                </form>
                <div className="space-y-2">
                    {videos.map(v => (
                        <div key={v.id} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                            <p>{v.title}</p>
                            <button onClick={() => handleDeleteVideo(v.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm">Delete</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hiring Page Management */}
            <div className="bg-surface p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Manage Hiring Page</h2>
                <form onSubmit={handleJobUpdate} className="space-y-4">
                    <input type="text" value={job.title} onChange={e => handleJobChange('title', e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600"/>
                    <textarea value={job.description} onChange={e => handleJobChange('description', e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-600 h-24"/>
                    <textarea placeholder="Responsibilities (one per line)" value={job.responsibilities.join('\n')} onChange={e => handleJobChange('responsibilities', e.target.value.split('\n'))} className="w-full p-2 rounded bg-gray-700 border border-gray-600 h-32"/>
                    <textarea placeholder="Qualifications (one per line)" value={job.qualifications.join('\n')} onChange={e => handleJobChange('qualifications', e.target.value.split('\n'))} className="w-full p-2 rounded bg-gray-700 border border-gray-600 h-32"/>
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">Update Job Posting</button>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;
