'use client';

import { useState } from 'react';
import { searchYouTubeVideos } from '@/utils/youtubeApi';

export function useYouTubeSearch() {
    const [videos, setVideos] = useState([]);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchVideos = async (searchTerm) => {
        if (!searchTerm || !searchTerm.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const results = await searchYouTubeVideos(searchTerm);
            setVideos(results);
            setSelectedVideoIndex(0); // Reset to first video when new search is performed
        } catch (err) {
            setError('Failed to fetch videos. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const selectVideo = (index) => {
        if (index >= 0 && index < videos.length) {
            setSelectedVideoIndex(index);
        }
    };

    const selectedVideo = videos[selectedVideoIndex] || null;

    return { 
        videos, 
        selectedVideo, 
        selectedVideoIndex,
        loading, 
        error, 
        searchVideos,
        selectVideo 
    };
}