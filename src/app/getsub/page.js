'use client';
import { useEffect, useState } from 'react';

export default function StudyPlansList() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/studyplans')
            .then(res => res.json())
            .then(data => {
                setPlans(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Your Study Plans</h2>
            <ul>
                {plans.length ?
                    plans.map(plan => (
                        <li key={plan.id}>{JSON.stringify(plan.studyPlan)}</li>
                    )) : (
                        <p>No study plans found.</p>
                    )}

            </ul>
        </div>
    );
}
