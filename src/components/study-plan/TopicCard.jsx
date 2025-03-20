import React, { useState } from 'react';
import SubtopicCard from './SubtopicCard';

const TopicCard = ({ subject, topic, onSubtopicCompletionChange }) => {
    const [completedCount, setCompletedCount] = useState(0); // Track the number of completed subtopics

    const handleCompletionChange = (isCompleted) => {
        setCompletedCount((prevCount) => (isCompleted ? prevCount + 1 : prevCount - 1));
        // Also update the global tracker
        if (onSubtopicCompletionChange) {
            onSubtopicCompletionChange(isCompleted);
        }
    };

    return (
        <div className="mb-6 ml-4">
            <div>
                <h4 className="text-xl font-semibold text-light-100 flex items-center gap-2 mb-4">
                    <span>📑</span> {topic.topic}
                </h4>
            </div>
            <div className="space-y-5 ml-4 mt-4">
                {topic.subtopics.map((subtopic, index) => (
                    <SubtopicCard
                        key={index}
                        subject={subject}
                        topic={topic.topic}
                        subtopic={subtopic}
                        stepNumber={index + 1}
                        onCompletionChange={handleCompletionChange} // Pass the callback to track completion
                    />
                ))}
            </div>
        </div>
    );
};

export default TopicCard;