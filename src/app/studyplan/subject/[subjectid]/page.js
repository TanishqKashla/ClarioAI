'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const SubjectPage = () => {
    const router = useRouter();
    const { subjectid } = useParams();
    const [subject, setSubject] = useState(null);
    const [loading, setLoading] = useState(true);

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
            <h1 className="text-3xl font-bold mb-6 text-white font-styrene">{subject.subjectName}</h1>

            {subject.topics && subject.topics.length > 0 ? (
                subject.topics.map(topic => (
                    <div
                        key={topic.topicId}
                        className="mb-6 bg-dark-100 border border-border rounded-md p-4 px-5 flex justify-between items-center gap-5 cursor-pointer hover:bg-secondary transition"
                        onClick={() => handleTopicClick(topic.topicId)}
                    >
                        <h2 className="text-lg font-semibold font-styrene">{topic.name}</h2>
                        <div className='flex items-center gap-3 flex-1 max-w-96 '>
                            <div className="w-full bg-dark-200 rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <p className="text-sm ">{progressPercentage}%</p>
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