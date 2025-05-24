'use client';

import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import { searchYouTubeVideos } from '@/utils/youtubeApi';
import { useSession } from 'next-auth/react';

const YouTubeSearch = ({ searchTerm, isOpen, planId, subjectId, topicId, subtopicId, selectedVideoId, onVideoSelect, syncing, recommendedVideos: initialRecommendedVideos }) => {
    const { data: session } = useSession();
    const [videos, setVideos] = useState(initialRecommendedVideos || []);
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasPatched, setHasPatched] = useState(false);

    // Set initial selected index based on selectedVideoId
    useEffect(() => {
        if (videos.length > 0 && selectedVideoId) {
            const idx = videos.findIndex(v => v.id === selectedVideoId || v.id?.videoId === selectedVideoId);
            setSelectedIdx(idx >= 0 ? idx : 0);
        }
    }, [selectedVideoId, videos]);

    // Fetch videos if not present
    useEffect(() => {
        if (!isOpen) return;
        if (videos.length > 0) return;
        if (!searchTerm) return;
        if (!session) {
            setError('Please sign in with Google to access YouTube videos');
            return;
        }

        setLoading(true);
        setError('');
        searchYouTubeVideos(searchTerm)
            .then(results => {
                // Map to minimal info for recommendedVideos
                const recVideos = results.map(v => ({
                    id: v.id.videoId,
                    title: v.snippet.title,
                    thumbnail: v.snippet.thumbnails?.default?.url || '',
                }));
                setVideos(recVideos);
                setSelectedIdx(0);
                // PATCH recommendedVideos to DB
                if (planId && subjectId && topicId && subtopicId && recVideos.length > 0 && !hasPatched) {
                    fetch('/api/studyplans', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            planId,
                            subjectId,
                            topicId,
                            subtopicId,
                            recommendedVideos: recVideos
                        })
                    }).then(() => setHasPatched(true));
                }
            })
            .catch((err) => {
                if (err.message.includes('No access token available')) {
                    setError('Please sign in with Google to access YouTube videos');
                } else {
                    setError('Failed to fetch videos. Please try again.');
                }
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, [isOpen, searchTerm, planId, subjectId, topicId, subtopicId, videos.length, hasPatched, session]);

    // Handle video selection
    const handleSelect = (e) => {
        const idx = Number(e.target.value);
        setSelectedIdx(idx);
        if (videos[idx]) {
            onVideoSelect && onVideoSelect(videos[idx].id);
        }
    };

    const selectedVideo = videos[selectedIdx];

    return (
        <div className="">
            {isOpen && (
                <div className="space-y-4">
                    {loading && <div className="text-center py-4">Loading videos...</div>}
                    {error && <div className="text-warning py-2">{error}</div>}
                    {videos.length > 0 && (
                        <>
                            <div className="flex items-center gap-3">
                                <label htmlFor="videoSelect" className="text-light-100">Select Video:</label>
                                <select
                                    id="videoSelect"
                                    value={selectedIdx}
                                    onChange={handleSelect}
                                    className="bg-dark-200 text-light-100 border border-border rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary"
                                    disabled={syncing}
                                >
                                    {videos.map((video, index) => (
                                        <option key={video.id} value={index}>
                                            {video.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {selectedVideo && (
                                <VideoPlayer
                                    videoId={selectedVideo.id}
                                    title={selectedVideo.title}
                                />
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default YouTubeSearch;