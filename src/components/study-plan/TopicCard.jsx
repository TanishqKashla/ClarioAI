import React, { useState } from 'react';
import SubtopicCard from './SubtopicCard';

const TopicCard = ({ subject, topic }) => {
    const [completedCount, setCompletedCount] = useState(0); // Track the number of completed subtopics

    const totalSubtopics = topic.subtopics.length;
    const progressPercentage = (completedCount / totalSubtopics) * 100;

    const handleCompletionChange = (isCompleted) => {
        setCompletedCount((prevCount) => (isCompleted ? prevCount + 1 : prevCount - 1));
    };

    return (
        <div className="mb-6 ml-4">
            <div>
                <h4 className="text-xl font-semibold text-light-100 flex items-center gap-2 mb-4">
                    <span>📑</span> {topic.topic}
                </h4>
                {/* Progress Bar */}
                <div className="w-full bg-dark-300 rounded-full h-1 mt-2">
                    <div
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
            <div className="space-y-6 ml-4 mt-5">
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