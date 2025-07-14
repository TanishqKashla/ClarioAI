'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

const defaultUsage = {
    'study-plan': { current: 0, limit: 3 },
    'ai-notes': { current: 0, limit: 10 },
    'regenerate-notes': { current: 0, limit: 1 }
};

const UsageDisplay = () => {
    const { data: session } = useSession();
    const [usage, setUsage] = useState(defaultUsage);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (session) {
            fetchUsage();
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line
    }, [session]);

    const fetchUsage = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/usage');
            const data = await response.json();
            if (data.success && data.usage) {
                setUsage({ ...defaultUsage, ...data.usage });
            } else {
                setUsage(defaultUsage);
                setError('Failed to load usage data.');
            }
        } catch (error) {
            setUsage(defaultUsage);
            setError('Failed to fetch usage.');
        } finally {
            setLoading(false);
        }
    };

    if (!session) return null;

    return (
        <div className="bg-dark-200 border border-border rounded-lg p-4 mb-4">
            <h3 className="text-light-100 font-semibold mb-3">Daily Usage</h3>
            {loading ? (
                <div className="flex items-center gap-2 text-light-300"><Loader2 className="animate-spin" /> Loading usage...</div>
            ) : error ? (
                <div className="text-warning mb-2">{error}</div>
            ) : null}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-light-200 text-sm">Study Plans</span>
                    <span className="text-light-100 text-sm">
                        {usage['study-plan']?.current ?? 0}/{usage['study-plan']?.limit ?? 3}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-light-200 text-sm">AI Notes</span>
                    <span className="text-light-100 text-sm">
                        {usage['ai-notes']?.current ?? 0}/{usage['ai-notes']?.limit ?? 10}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-light-200 text-sm">Note Regenerations</span>
                    <span className="text-light-100 text-sm">
                        {usage['regenerate-notes']?.current ?? 0}/{usage['regenerate-notes']?.limit ?? 1}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UsageDisplay; 