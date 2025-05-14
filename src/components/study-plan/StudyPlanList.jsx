import React from 'react';
import SubjectCard from './SubjectCard';

const StudyPlanList = ({ studyPlan }) => {
    if (!studyPlan || studyPlan.length === 0) {
        return <p>No study plan available.</p>;
    }

    return (
        <div className=" p-6">
            {/* <h2 className="text-2xl font-semibold text-light-100 mb-6">Your Study Plan</h2> */}
            {studyPlan.map((subject, index) => (
                <SubjectCard
                    key={index}
                    subject={subject}
                />
            ))}
        </div>
    );
};

export default StudyPlanList;