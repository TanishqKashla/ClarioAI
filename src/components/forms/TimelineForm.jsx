// src/components/forms/TimelineForm.jsx
'use client';

import React from 'react';
import Input from '@/components/common/Input';
import { useStudyPlan } from '@/contexts/StudyPlanContext';

const TimelineForm = () => {
    const { studyTime, setStudyTime } = useStudyPlan();

    const handleTimeChange = (field, value) => {
        setStudyTime({
            ...studyTime,
            [field]: value
        });
    };

    return (
        <div>
            <h3 className="text-xl font-semibold text-light-100 mb-4 font-styrene">Study Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-light-100 mb-2 font-styrene">Weeks</label>
                    <Input
                        type="number"
                        min="1"
                        placeholder="Number of weeks"
                        value={studyTime.weeks}
                        onChange={(e) => handleTimeChange('weeks', e.target.value)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-light-100 mb-2 font-styrene">Days per week</label>
                    <Input
                        type="number"
                        min="1"
                        max="7"
                        placeholder="Days per week"
                        value={studyTime.days}
                        onChange={(e) => handleTimeChange('days', e.target.value)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-light-100 mb-2 font-styrene">Hours per day</label>
                    <Input
                        type="number"
                        min="1"
                        max="24"
                        placeholder="Hours per day"
                        value={studyTime.hours}
                        onChange={(e) => handleTimeChange('hours', e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default TimelineForm;