'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SubtopicCard from '@/components/study-plan/SubtopicCard';

const TopicPage = () => {
    const { subjectid, topicid } = useParams();
    const [subject, setSubject] = useState(null);
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completedCount, setCompletedCount] = useState(0);

    const updateProgress = (updatedSubtopics) => {
        const completed = updatedSubtopics.filter(sub => sub.isCompleted).length;
        setCompletedCount(completed);
    };

    useEffect(() => {
        const fetchTopic = async () => {
            const res = await fetch('/api/studyplans');
            const plans = await res.json();

            let foundSubject = null;
            let foundTopic = null;

            for (const plan of plans) {
                const subj = plan.studyPlan.find(sub => sub.subjectId === subjectid);
                if (subj) {
                    foundSubject = subj;
                    foundTopic = subj.topics.find(t => t.topicId === topicid);
                    break;
                }
            }

            setSubject(foundSubject);
            if (foundTopic) {
                setTopic({ ...foundTopic });
                updateProgress(foundTopic.subtopics);
            }

            setLoading(false);
        };
        fetchTopic();
    }, [subjectid, topicid]);

    const handleCompletionChange = (index, newStatus) => {
        const updatedSubtopics = [...topic.subtopics];
        updatedSubtopics[index].isCompleted = newStatus;
        setTopic({ ...topic, subtopics: updatedSubtopics });
        updateProgress(updatedSubtopics);
    };

    if (loading) return <div className="text-light-100 p-4">Loading...</div>;
    if (!topic || !subject) return <div className="text-light-100 p-4">Topic not found.</div>;

    const total = topic.subtopics.length;
    const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    return (
        <div className="min-h-screen bg-dark-200 p-8">
            <h2 className="text-lg text-light-100 mb-2">
                {subject.subjectName}
            </h2>
            <h1 className="text-3xl font-bold  mb-6">
                {topic.name}
            </h1>

            {/* Progress Bar */}
            <div className="w-full bg-dark-100 rounded-full h-2 mb-3">
                <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <div className="text-sm text-light-300 mb-6">{percentage}% completed</div>

            <div className="space-y-6">
                {topic.subtopics.map((subtopic, index) => (
                    <SubtopicCard
                        key={subtopic.subtopicId}
                        subtopic={{ ...subtopic, subTopic: subtopic.name }}
                        stepNumber={index + 1}
                        onCompletionChange={(status) => handleCompletionChange(index, status)}
                    />
                
                ))}
            </div>
        </div>
    );
};

export default TopicPage;
