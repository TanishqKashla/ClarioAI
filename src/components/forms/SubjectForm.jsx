// src/components/forms/SubjectForm.jsx
'use client';

import React, { useState } from 'react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useStudyPlan } from '@/contexts/StudyPlanContext';

const SubjectForm = () => {
    const [currentSubject, setCurrentSubject] = useState('');
    const { addSubject } = useStudyPlan();

    const handleAddSubject = () => {
        if (addSubject(currentSubject)) {
            setCurrentSubject('');
        }
    };

    return (
        <div className="flex gap-4">
            <Input
                type="text"
                placeholder="Enter subject name"
                value={currentSubject}
                onChange={(e) => setCurrentSubject(e.target.value)}
                className="flex-1"
            />
            <Button onClick={handleAddSubject} className="whitespace-nowrap">
                Add Subject
            </Button>
        </div>
    );
};

export default SubjectForm;