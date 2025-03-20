// src/components/study-plan/StudyPlanList.jsx
import React, { useState, useEffect } from 'react';
import SubjectCard from './SubjectCard';

const StudyPlanList = ({ studyPlan }) => {
    const [totalSubtopics, setTotalSubtopics] = useState(0);
    const [completedSubtopics, setCompletedSubtopics] = useState(0);
    const [progress, setProgress] = useState(0);

    // Calculate total number of subtopics on initial render
    useEffect(() => {
        if (!studyPlan || studyPlan.length === 0) return;
        
        let count = 0;
        studyPlan.forEach(subject => {
            subject.topics.forEach(topic => {
                count += topic.subtopics.length;
            });
        });
        setTotalSubtopics(count);
    }, [studyPlan]);

    // Update progress whenever completed count changes
    useEffect(() => {
        if (totalSubtopics === 0) return;
        const percentage = Math.round((completedSubtopics / totalSubtopics) * 100);
        setProgress(percentage);
    }, [completedSubtopics, totalSubtopics]);

    const handleSubtopicCompletionChange = (isCompleted) => {
        setCompletedSubtopics(prev => 
            isCompleted ? prev + 1 : Math.max(0, prev - 1)
        );
    };

    if (!studyPlan || studyPlan.length === 0) {
        return null;
    }

    return (
        <div className='bg-dark-100 rounded-2xl p-8 shadow-dark-lg border border-border/40'>
            <h2 className="text-2xl font-semibold text-light-100 mb-6">Your Study Plan</h2>
            
            {/* Overall Progress Section */}
            <div className="mb-8 p-4 bg-dark-300 rounded-xl border border-border/20">
                <h3 className="text-lg font-semibold text-light-100 mb-3">Your Progress</h3>
                
                {/* Progress Bar Container */}
                <div className="relative w-full h-6 bg-dark-400 rounded-md overflow-hidden">
                    {/* Animated Fill */}
                    <div 
                        className="h-full bg-primary transition-all duration-700 ease-in-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                    
                    {/* Percentage Text - Positioned to the right of the filled part */}
                    <div className="absolute inset-0 flex items-center px-4 justify-end">
                        <span className="text-sm font-medium text-light-100">
                            {progress}% Complete
                        </span>
                    </div>
                </div>
                
                {/* Subtopic Progress Counter */}
                <div className="mt-2 text-sm text-light-300 flex justify-between">
                    <span>Completed: {completedSubtopics} of {totalSubtopics} subtopics</span>
                    <span>{totalSubtopics - completedSubtopics} remaining</span>
                </div>
            </div>
            
            {studyPlan.map((subject, index) => (
                <SubjectCard 
                    key={index} 
                    subject={subject} 
                    onSubtopicCompletionChange={handleSubtopicCompletionChange}
                />
            ))}
        </div>
    );
};

export default StudyPlanList;