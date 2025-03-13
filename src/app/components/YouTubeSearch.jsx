import React, { useState } from 'react';
import { searchYouTubeVideos } from '../utils/youtubeApi';
import VideoPlayer from './VideoPlayer';

const YouTubeSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const result = await searchYouTubeVideos(searchQuery);
            setVideo(result);
        } catch (err) {
            setError('Failed to fetch video. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="youtube-search">
            <h1>YouTube Video Search</h1>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a video..."
                    className="search-input"
                />
                <button type="submit" className="search-button" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {video && (
                <VideoPlayer
                    videoId={video.id.videoId}
                    title={video.snippet.title}
                />
            )}

            <style jsx>{`
        .youtube-search {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .search-form {
          display: flex;
          margin-bottom: 20px;
        }
        .search-input {
          flex: 1;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
        }
        .search-button {
          padding: 10px 20px;
          background-color: #ff0000;
          color: white;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          font-size: 16px;
        }
        .search-button:disabled {
          background-color: #cccccc;
        }
        .error-message {
          color: #ff0000;
          margin-bottom: 20px;
        }
      `}</style>
        </div>
    );
};

export default YouTubeSearch;