import React from 'react';
import TopicCard from './TopicCard';

const SubjectCard = ({ subject, topic, onSubtopicCompletionChange }) => {

    if (!subject) return <div>Subject not found.</div>;
    return (
        <div className="mb-8">
            {/* Subject Name */}
            <h3 className="text-2xl font-bold text-primary uppercase flex items-center gap-2 mb-4">
                <span></span> {subject}
            </h3>

            <TopicCard
                topic={topic}
                onSubtopicCompletionChange={onSubtopicCompletionChange}
            />

        </div>
    );
};

export default SubjectCard;