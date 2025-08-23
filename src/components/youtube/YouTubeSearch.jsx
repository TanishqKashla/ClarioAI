'use client';

import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from './VideoPlayer';
import { searchYouTubeVideos } from '@/utils/youtubeApi';
import { FolderOpenDot } from 'lucide-react';

const YouTubeSearch = ({ searchTerm, isOpen, planId, subjectId, topicId, subtopicId, selectedVideoId, onVideoSelect, syncing, recommendedVideos: initialRecommendedVideos }) => {
    const [videos, setVideos] = useState(initialRecommendedVideos || []);
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasPatched, setHasPatched] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

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
        if (hasSearched) return; // Prevent duplicate searches

        // console.log('🚀 Starting API call for:', searchTerm);
        setHasSearched(true);
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
            .catch(() => setError('Failed to fetch videos.'))
            .finally(() => setLoading(false));
    }, [isOpen, searchTerm, planId, subjectId, topicId, subtopicId, hasPatched, hasSearched]);

    // Reset search flag when searchTerm changes
    useEffect(() => {
        // console.log('🔄 Resetting hasSearched for new searchTerm:', searchTerm);
        setHasSearched(false);
    }, [searchTerm]);

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
                <div className="">
                    {loading && <div className="text-center py-4">Loading videos...</div>}
                    {error && <div className="text-warning py-2">{error}</div>}
                    {videos.length > 0 && (
                        <>
                            {selectedVideo && (
                                <VideoPlayer
                                    videoId={selectedVideo.id}
                                    title={selectedVideo.title}
                                />
                            )}
                            <div className="flex items-center gap-2">
                                <label htmlFor="videoSelect" className="text-light-100"> <FolderOpenDot /></label>
                                <select
                                    id="videoSelect"
                                    value={selectedIdx}
                                    onChange={handleSelect}
                                    className="bg-card text-light-100 border border-border truncate rounded-md px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                    disabled={syncing}
                                >
                                    {videos.map((video, index) => (
                                        <option key={video.id} value={index}>
                                            {video.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default YouTubeSearch;