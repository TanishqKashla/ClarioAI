// src/components/forms/TimelineForm.jsx
'use client';

import React from 'react';
import Input from '@/components/common/Input';
import { useStudyPlan } from '@/contexts/StudyPlanContext';

const TimelineForm = () => {
    const { studyTime, setStudyTime } = useStudyPlan();

    return (
        <div className="bg-dark-100 rounded-xl p-6 mt-8">
            <h2 className="text-2xl font-semibold mb-6">Study Timeline</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Input
                    type="number"
                    label="Days"
                    value={studyTime.days}
                    onChange={(e) => setStudyTime({ ...studyTime, days: e.target.value })}
                />
                <Input
                    type="number"
                    label="Hours per Day"
                    value={studyTime.hours}
                    onChange={(e) => setStudyTime({ ...studyTime, hours: e.target.value })}
                />
                <Input
                    type="number"
                    label="Weeks"
                    value={studyTime.weeks}
                    onChange={(e) => setStudyTime({ ...studyTime, weeks: e.target.value })}
                />
            </div>
        </div>
    );
};

export default TimelineForm;