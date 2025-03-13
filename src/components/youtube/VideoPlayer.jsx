import React from 'react';

const VideoPlayer = ({ videoId, title }) => {
    if (!videoId) return <div>No video found</div>;

    return (
        <div className="video-container">
            <h2>{title}</h2>
            <div className="responsive-iframe-container">
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <style jsx>{`
        .video-container {
          margin: 20px 0;
        }
        .responsive-iframe-container {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
        }
        .responsive-iframe-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
        </div>
    );
};

export default VideoPlayer;