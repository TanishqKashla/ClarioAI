'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { InfoButton } from './info-button';

const UsageDisplay = () => {
    const { data: session } = useSession();
    const [usage, setUsage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchUsage();
        }
    }, [session]);

    const fetchUsage = async () => {
        try {
            const response = await fetch('/api/usage');
            const data = await response.json();

            if (data.success) {
                setUsage(data.usage);
            }
        } catch (error) {
            console.error('Failed to fetch usage:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!session || loading) {
        return null;
    }

    if (!usage) {
        return null;
    }

    return (
        <div className="bg-dark-200 border border-border xs:max-w-80 min-w-56 sm:min-w-full  rounded-lg p-4 mb-4">
            <div className='flex justify-between '>
                <h3 className="text-light-100 font-semibold mb-5 font-styrene">Daily Usage</h3>
                <InfoButton message={"Daily limits reset every 24 hours. After hitting a limit, you can use the feature again once it resets."} />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-light-200 text-sm">Subject Creation</span>
                    <span className="text-light-100 text-sm">
                        {usage['study-plan'].current}/{usage['study-plan'].limit}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-light-200 text-sm">AI Notes</span>
                    <span className="text-light-100 text-sm">
                        {usage['ai-notes'].current}/{usage['ai-notes'].limit}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-light-200 text-sm">Note Regenerations</span>
                    <span className="text-light-100 text-sm">
                        {usage['regenerate-notes'].current}/{usage['regenerate-notes'].limit}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UsageDisplay; 