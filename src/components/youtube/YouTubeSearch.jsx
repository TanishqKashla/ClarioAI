'use client';

import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import { useYouTubeSearch } from '@/hooks/useYouTubeSearch';

const YouTubeSearch = ({ searchTerm, isOpen }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { video, loading, error, searchVideos } = useYouTubeSearch();

    useEffect(() => {
        if (isOpen && !isDropdownOpen) {
            setIsDropdownOpen(true);
            searchVideos(searchTerm);
        } else if (!isOpen && isDropdownOpen) {
            setIsDropdownOpen(false);
        }
    }, [isOpen, searchTerm, isDropdownOpen, searchVideos]);

    return (
        <div className="">
            {isDropdownOpen && (
                <div className="">
                    {loading && <div className="text-center py-4">Loading video...</div>}
                    {error && <div className="text-warning py-2">{error}</div>}
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

export default YouTubeSearch;