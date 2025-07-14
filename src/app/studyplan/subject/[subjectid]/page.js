'use client';
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const SubjectPage = () => {

    // const pseudoSubject = {
    //     subjectId: "placeholder-id",
    //     subjectName: "Sample Subject",
    //     topics: [
    //         {
    //             topicId: "topic-1",
    //             name: "Introduction to Sample",
    //             subtopics: [
    //                 { subtopicId: "sub-1", name: "Overview", isCompleted: false },
    //                 { subtopicId: "sub-2", name: "Basics", isCompleted: true }
    //             ]
    //         },
    //         {
    //             topicId: "topic-2",
    //             name: "Advanced Concepts",
    //             subtopics: [
    //                 { subtopicId: "sub-3", name: "Deep Dive", isCompleted: false },
    //                 { subtopicId: "sub-4", name: "Case Studies", isCompleted: false }
    //             ]
    //         }
    //     ]
    // };

    const router = useRouter();
    const { subjectid } = useParams();
    const [subject, setSubject] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     setSubject(pseudoSubject); // Simulating fetching subject data
    //     setLoading(false);
    // }
    //     , [subjectid]);

    useEffect(() => {
        const fetchSubject = async () => {
            const res = await fetch('/api/studyplans');
            const plans = await res.json();

            for (const plan of plans) {
                const found = plan.studyPlan.find(sub => sub.subjectId === subjectid);
                if (found) {
                    setSubject(found);
                    break;
                }
            }
            setLoading(false);
        };
        fetchSubject();
    }, [subjectid]);

    const handleTopicClick = (topicId) => {
        router.push(`/studyplan/subject/${subjectid}/topic/${topicId}`);
    };

    function getProgressPercentage(subject) {
        let total = 0;
        let completed = 0;
        subject.topics?.forEach(topic => {
            topic.subtopics?.forEach(sub => {
                total += 1;
                if (sub.isCompleted) completed += 1;
            });
        });
        return total === 0 ? 0 : Math.round((completed / total) * 100);
    }

    const progressPercentage = subject ? getProgressPercentage(subject) : 0;

    if (loading) return <div>Loading...</div>;
    if (!subject) return <div>Subject not found.</div>;

    return (
        <div className=" w-full p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-3xl font-bold mb-6 text-white font-styrene">{subject.subjectName}</h1>
                <Button
                    onClick={() => router.push(`/studyplan/subject/${subjectid}/addtopic`)}
                >
                    <Plus /> Add Topic

                </Button>
            </div>

            {subject.topics && subject.topics.length > 0 ? (
                subject.topics.map(topic => (
                    <div
                        key={topic.topicId}
                        className="mb-6 overflow-hidden relative bg-dark-100 border border-border rounded-md p-4 px-5 flex justify-between items-center gap-5 cursor-pointer hover:bg-secondary transition"
                        onClick={() => handleTopicClick(topic.topicId)}
                    >
                        <div className="flex justify-between items-center gap-1 w-full">
                            <h2 className="md:text-lg text-md font-semibold font-styrene truncate">{topic.name}</h2>
                            <p className="text-sm ">{progressPercentage}%</p>
                        </div>

                        <div className="w-full bg-secondary h-1.5 absolute bottom-0 left-0">
                            <div
                                className="bg-primary h-1.5 rounded-l-none rounded-full transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))
            ) : (
                <div>No topics found for this subject.</div>
            )}
        </div>
    );
};

export default SubjectPage;