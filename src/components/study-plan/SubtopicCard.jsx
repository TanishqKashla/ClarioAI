import React, { useState } from 'react';
import YouTubeSearch from '@/components/youtube/YouTubeSearch';
import SubtopicNotes from '@/components/notes/SubtopicNotes';

const SubtopicCard = ({ subject, topic, subtopic, stepNumber, onCompletionChange, planId }) => {
    const { name, searchTerm, description, focusAreas } = subtopic;
    // Use local state for isCompleted and selectedVideoId for optimistic UI
    const [isCompleted, setIsCompleted] = useState(subtopic.isCompleted);
    const [selectedVideoId, setSelectedVideoId] = useState(subtopic.selectedVideoId || '');
    const [syncing, setSyncing] = useState(false);
    const [syncError, setSyncError] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Unified sync function
    const syncSubtopic = async (newCompleted, newVideoId) => {
        setSyncing(true);
        setSyncError('');
        try {
            await fetch('/api/studyplans', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId,
                    subjectId: subject?.subjectId,
                    topicId: topic?.topicId,
                    subtopicId: subtopic?.subtopicId,
                    isCompleted: newCompleted,
                    selectedVideoId: newVideoId
                }),
            });
            setSyncing(false);
        } catch (error) {
            setSyncError('Failed to sync. Please try again.');
            setSyncing(false);
            return false;
        }
        return true;
    };

    // Checkbox handler
    const toggleCompletion = async (e) => {
        e.stopPropagation();
        const newCompleted = e.target.checked;
        const prevCompleted = isCompleted;
        setIsCompleted(newCompleted);
        const success = await syncSubtopic(newCompleted, selectedVideoId);
        if (!success) {
            setIsCompleted(prevCompleted); // revert
        } else {
            onCompletionChange(newCompleted);
        }
    };

    // Video select handler
    const handleVideoSelect = async (videoId) => {
        const prevVideoId = selectedVideoId;
        setSelectedVideoId(videoId);
        const success = await syncSubtopic(isCompleted, videoId);
        if (!success) {
            setSelectedVideoId(prevVideoId); // revert
        }
    };

    return (
        <div className="bg-dark-100 overflow-hidden rounded-md w-full relative">
            {syncing && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
                    <span className="text-primary font-semibold">Syncing...</span>
                </div>
            )}
            <button
                className={`p-4 flex gap-3 w-full text-left ${syncing ? 'opacity-60 pointer-events-none' : ''}`}
                onClick={toggleDropdown}
                disabled={syncing}
            >
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={toggleCompletion}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                            disabled={syncing}
                        />
                        <h3 className="text-lg font-medium text-light-100">
                            {stepNumber}. {name}
                        </h3>
                    </div>
                </div>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="space-y-3 p-6 pt-0 text-light-200 mt-3 gap-5 flex">
                    <div className="flex-1 max-h-[700px] pr-5 overflow-y-scroll">
                        <div>
                            <span className="font-medium text-light-100 block mb-2">Focus Areas: </span>
                            <ul className="flex flex-wrap gap-2">
                                {focusAreas.map((area, index) => (
                                    <li
                                        key={index}
                                        className="info px-3 py-1 rounded-full text-sm text-primary border border-primary/20"
                                    >
                                        {area}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="my-5">{description}</div>
                        <div>
                            <SubtopicNotes
                                subject={subject || ''}
                                topic={topic || ''}
                                subtopic={subtopic}
                                planId={planId}
                            />
                        </div>
                    </div>
                    <div className="w-[550px]">
                        <span className="font-medium text-light-100">YouTube Search: </span>
                        {searchTerm}
                        <YouTubeSearch 
                            searchTerm={searchTerm} 
                            isOpen={isOpen}
                            planId={planId}
                            subjectId={subject?.subjectId}
                            topicId={topic?.topicId}
                            subtopicId={subtopic?.subtopicId}
                            selectedVideoId={selectedVideoId}
                            onVideoSelect={handleVideoSelect}
                            syncing={syncing}
                            recommendedVideos={subtopic.recommendedVideos}
                        />
                    </div>
                </div>
            )}
            {syncError && (
                <div className="absolute bottom-2 left-2 right-2 bg-red-700 text-white text-center rounded p-2 z-20">
                    {syncError}
                </div>
            )}
        </div>
    );
};

export default SubtopicCard;
