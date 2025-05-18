import React from 'react';
import SubjectCard from './SubjectCard';

const StudyPlanList = ({ subject, topic }) => {
    if (!subject || subject.length === 0) {
        return <p>No study plan available.</p>;
    }

    return (
        <div className=" p-6">
            
            {subject.map((subject, index) => (
                <SubjectCard
                    key={index}
                    subject={subject}
                />
            ))}
        </div>
    );
};

export default StudyPlanList;