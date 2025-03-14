'use client';

import { createContext, useContext, useState } from 'react';
import { generateStudyPlan } from '@/services/groqService';

const StudyPlanContext = createContext();

export function StudyPlanProvider({ children }) {
    const [subjects, setSubjects] = useState([]);
    const [studyTime, setStudyTime] = useState({
        days: '',
        hours: '',
        weeks: ''
    });
    const [studyPlan, setStudyPlan] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const addSubject = (subjectName) => {
        if (subjectName.trim()) {
            setSubjects([...subjects, { name: subjectName, topics: [] }]);
            return true;
        }
        return false;
    };

    const addTopic = (subjectIndex, topicName, subtopics) => {
        if (topicName.trim() && subtopics.trim()) {
            const newSubjects = [...subjects];
            const subtopicsList = subtopics.split(',').map(st => st.trim()).filter(st => st);
            newSubjects[subjectIndex].topics.push({
                name: topicName,
                subtopics: subtopicsList
            });
            setSubjects(newSubjects);
            return true;
        }
        return false;
    };

    const generatePlan = async () => {
        setIsLoading(true);
        setError('');
        setStudyPlan([]);

        try {
            const plan = await generateStudyPlan({
                subjects,
                studyTime
            });
            setStudyPlan(plan);
            return plan;
        } catch (err) {
            setError('Failed to generate study plan. Please try again.');
            console.error(err);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        subjects,
        studyTime,
        studyPlan,
        isLoading,
        error,
        addSubject,
        addTopic,
        setStudyTime,
        generatePlan
    };

    return (
        <StudyPlanContext.Provider value={value}>
            {children}
        </StudyPlanContext.Provider>
    );
}

export function useStudyPlan() {
    const context = useContext(StudyPlanContext);
    if (context === undefined) {
        throw new Error('useStudyPlan must be used within a StudyPlanProvider');
    }
    return context;
}