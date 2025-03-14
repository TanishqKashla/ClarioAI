import React, { useState } from 'react';
import { searchYouTubeVideos } from '../utils/youtubeApi';
import VideoPlayer from './VideoPlayer';

const SubtopicYouTubeSearch = ({ searchTerm }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const result = await searchYouTubeVideos(searchTerm);
            setVideo(result);
        } catch (err) {
            setError('Failed to fetch video. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen && !video) {
            handleSearch();
        }
    };

    return (
        <div className="mt-3">
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
                <span>Watch YouTube Video</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="mt-2">
                    {loading && <div className="text-center py-4">Loading video...</div>}
                    {error && <div className="text-red-500 py-2">{error}</div>}
                    {video && (
                        <VideoPlayer
                            videoId={video.id.videoId}
                            title={video.snippet.title}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default SubtopicYouTubeSearch; 