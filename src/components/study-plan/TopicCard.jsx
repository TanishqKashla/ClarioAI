import React from 'react';
import SubtopicCard from './SubtopicCard';

const TopicCard = ({ topic }) => {
    return (
        <div className="mb-6 ml-4">
            <h4 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-4">
                <span>📑</span> {topic.topic}
            </h4>
            <div className="space-y-4 ml-4">
                {topic.subtopics.map((subtopic, index) => (
                    <SubtopicCard key={index} subtopic={subtopic} />
                ))}
            </div>
        </div>
    );
};

export default TopicCard;
