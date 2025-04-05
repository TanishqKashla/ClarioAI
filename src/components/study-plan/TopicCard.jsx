import React, { useState } from 'react';
import SubtopicCard from './SubtopicCard';

const TopicCard = ({ subject, topic, onSubtopicCompletionChange }) => {
    const [completedCount, setCompletedCount] = useState(0); // Track the number of completed subtopics
    const totalSubtopics = topic.subtopics.length;
    const progressPercentage = (completedCount / totalSubtopics) * 100;

    const handleCompletionChange = (isCompleted) => {
        setCompletedCount((prevCount) => (isCompleted ? prevCount + 1 : prevCount - 1));
        // Notify parent about the change
        if (onSubtopicCompletionChange) {
            onSubtopicCompletionChange(isCompleted);
        }
    };

    return (
        <div className="mb-6 ml-4 border-4 border-l-primary">
            {/* Topic Name */}
            <h4 className="text-xl font-semibold text-light-100 flex items-center gap-2 mb-4">
                <span>📑</span> {topic.topic}
            </h4>

            {/* Progress Bar */}
            <div className="w-full bg-dark-300 rounded-full h-2 mt-2 mb-4">
                <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>

            {/* Render Subtopic Cards */}
            <div className="space-y-5 ml-4 mt-4">
                {topic.subtopics.map((subtopic, index) => (
                    <SubtopicCard
                        key={index}
                        subject={subject}
                        topic={topic.topic}
                        subtopic={subtopic}
                        stepNumber={index + 1}
                        onCompletionChange={handleCompletionChange}
                    />
                ))}
            </div>
        </div>
    );
};

export default TopicCard;