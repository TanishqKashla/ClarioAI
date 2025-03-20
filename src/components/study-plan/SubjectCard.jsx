import React from 'react';
import TopicCard from './TopicCard';

const SubjectCard = ({ subject, onSubtopicCompletionChange }) => {
    
    return (
        <div className="mb-8">
            <h3 className="text-2xl font-bold text-primary flex items-center gap-2 mb-4">
                <span>📚</span> {subject.subject}
            </h3>
            {subject.topics.map((topic, index) => (
                <TopicCard 
                    key={index} 
                    subject={subject.subject} 
                    topic={topic} 
                    onSubtopicCompletionChange={onSubtopicCompletionChange}
                />
            ))}
        </div>
    );
};

export default SubjectCard;