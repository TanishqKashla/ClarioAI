'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Calendar, BookOpen, Clock } from 'lucide-react';

const RecentStudyPlans = () => {
    const { data: session } = useSession();
    const [studyPlans, setStudyPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchStudyPlans();
        }
    }, [session]);

    const fetchStudyPlans = async () => {
        try {
            const response = await fetch('/api/studyplans');
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setStudyPlans(data.slice(0, 5)); // Show only the 5 most recent
            }
        } catch (error) {
            console.error('Failed to fetch study plans:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            return 'Today';
        } else if (diffDays === 2) {
            return 'Yesterday';
        } else if (diffDays <= 7) {
            return `${diffDays - 1} days ago`;
        } else {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
            });
        }
    };

    const getSubjectNames = (studyPlan) => {
        if (!studyPlan.studyPlan || !Array.isArray(studyPlan.studyPlan)) {
            return ['No subjects'];
        }
        return studyPlan.studyPlan.map(subject => subject.subjectName || 'Untitled Subject');
    };

    const getTotalTopics = (studyPlan) => {
        if (!studyPlan.studyPlan || !Array.isArray(studyPlan.studyPlan)) {
            return 0;
        }
        return studyPlan.studyPlan.reduce((total, subject) => {
            return total + (subject.topics ? subject.topics.length : 0);
        }, 0);
    };

    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-dark-200 border border-border rounded-lg p-4 animate-pulse">
                        <div className="h-4 bg-dark-300 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-dark-300 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (studyPlans.length === 0) {
        return (
            <div className="bg-dark-200 border border-border rounded-lg p-6 text-center">
                <BookOpen className="w-8 h-8 text-light-300 mx-auto mb-3" />
                <p className="text-light-200 mb-2">No study plans yet</p>
                <p className="text-light-300 text-sm">Create your first study plan to get started</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {studyPlans.map((plan) => {
                const subjectNames = getSubjectNames(plan);
                const totalTopics = getTotalTopics(plan);
                
                return (
                    <Link 
                        key={plan.id} 
                        href={`/studyplan/subject/${plan.studyPlan?.[0]?.subjectId || plan.id}`}
                        className="block bg-dark-200 border border-border rounded-lg p-4 hover:bg-dark-300 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                                <h3 className="text-light-100 font-medium mb-1">
                                    {subjectNames[0] || 'Untitled Study Plan'}
                                </h3>
                                {subjectNames.length > 1 && (
                                    <p className="text-light-300 text-sm">
                                        +{subjectNames.length - 1} more subjects
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center text-light-300 text-xs">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatDate(plan.createdAt)}
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-light-300 text-sm">
                            <div className="flex items-center">
                                <BookOpen className="w-3 h-3 mr-1" />
                                <span>{totalTopics} topics</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{formatDate(plan.updatedAt)}</span>
                            </div>
                        </div>
                    </Link>
                );
            })}
            
            {studyPlans.length >= 5 && (
                <div className="text-center pt-2">
                    <Link 
                        href="/" 
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                        View all study plans →
                    </Link>
                </div>
            )}
        </div>
    );
};

export default RecentStudyPlans; 