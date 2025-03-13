// src/components/study-plan/StudyPlanList.jsx
import React from 'react';
import SubjectCard from './SubjectCard';

const StudyPlanList = ({ studyPlan }) => {
    if (!studyPlan || studyPlan.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Your Study Plan</h2>
            {studyPlan.map((subject, index) => (
                <SubjectCard key={index} subject={subject} />
            ))}
        </div>
    );
};

export default StudyPlanList;