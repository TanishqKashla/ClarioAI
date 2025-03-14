// src/components/forms/TopicForm.jsx
'use client';

import React, { useState } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useStudyPlan } from '@/contexts/StudyPlanContext';

const TopicForm = ({ subjectIndex }) => {
    const [currentTopic, setCurrentTopic] = useState('');
    const [currentSubtopics, setCurrentSubtopics] = useState('');
    const { addTopic } = useStudyPlan();

    const handleAddTopic = () => {
        if (addTopic(subjectIndex, currentTopic, currentSubtopics)) {
            setCurrentTopic('');
            setCurrentSubtopics('');
        }
    };

    return (
        <div className="space-y-4 mb-6">
            <Input
                type="text"
                placeholder="Enter topic name"
                value={currentTopic}
                onChange={(e) => setCurrentTopic(e.target.value)}
            />
            <Input
                type="text"
                placeholder="Enter subtopics (comma-separated)"
                value={currentSubtopics}
                onChange={(e) => setCurrentSubtopics(e.target.value)}
            />
            <Button
                onClick={handleAddTopic}
                className="w-full sm:w-auto"
            >
                Add Topic
            </Button>
        </div>
    );
};

export default TopicForm;