'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Calendar, BookOpen, Clock, SquarePen } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

const RecentStudyPlans = ({ studyPlans }) => {

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


    if (!studyPlans || studyPlans.length === 0) {
        return (
            <div className='flex w-full flex-col items-center gap-4 h-full'>
                <div className="relative w-40 h-40 md:w-72 md:h-72 mt-5">
                    <Image
                        src="/illustrations/illustration1.png"
                        alt="hero"
                        fill
                        className="object-contain"
                    />
                </div>
                <h2 className='text-light-100 font-medium text-md md:text-2xl'>Start by adding your first subject</h2>
                <Button className=" justify-start">
                    <Link className="flex gap-2 items-center text-left justify-start" href="/newsubject"> <SquarePen size={17} /> Add Subject</Link>
                </Button>
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
            
            {/* {studyPlans.length >= 5 && (
                <div className="text-center pt-2">
                    <Link 
                        href="/" 
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                        View all study plans →
                    </Link>
                </div>
            )} */}
        </div>
    );
};

export default RecentStudyPlans; 