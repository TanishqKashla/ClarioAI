'use client';

import { useState } from 'react';
import { searchYouTubeVideos } from '@/utils/youtubeApi';

export function useYouTubeSearch() {
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchVideos = async (searchTerm) => {
        if (!searchTerm || !searchTerm.trim()) return;

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

    return { video, loading, error, searchVideos };
}