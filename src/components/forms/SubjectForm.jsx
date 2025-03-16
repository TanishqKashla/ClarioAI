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
        <div className="flex gap-4 min-w-[300px]">
            <Input
                type="text"
                placeholder="Enter subject name"
                value={currentSubject}
                onChange={(e) => setCurrentSubject(e.target.value)}
                className="flex-grow"
            />
            <Button onClick={handleAddSubject} className="flex-shrink-0">
                Add it
            </Button>
        </div>
    );
};

export default SubjectForm;