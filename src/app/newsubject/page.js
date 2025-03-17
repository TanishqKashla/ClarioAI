'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubjectForm from '@/components/forms/SubjectForm';
import TopicForm from '@/components/forms/TopicForm';
import TimelineForm from '@/components/forms/TimelineForm';
import Button from '@/components/common/Button';
import { useStudyPlan } from '@/contexts/StudyPlanContext';
import Input from '@/components/common/Input';

export default function NewSubjectPage() {
  const { subjects, isLoading, error, generatePlan } = useStudyPlan();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const plan = await generatePlan();
    if (plan) {
      router.push('/studyplan');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-dark-200 py-12">
      <div className="container mx-auto px-4">
       
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-dark-100 rounded-2xl p-8 shadow-dark-lg border border-border/40">
            <h2 className="text-2xl font-semibold text-light-100 mb-6">Syllabus Details</h2>

            <div className="space-y-8">
              <SubjectForm />

              {subjects.map((subject, subjectIndex) => (
                <div key={subjectIndex} className="bg-dark-300 rounded-xl p-6 border border-border/20">
                  <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-4">
                    <span>📚</span> {subject.name}
                  </h3>

                  <TopicForm subjectIndex={subjectIndex} />

                  <div className="pl-4">
                    {subject.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-primary font-semibold flex items-center gap-2">
                            📑 {topic.name}
                          </span>
                        </div>
                        <ul className="space-y-2 pl-6">
                          {topic.subtopics.map((subtopic, subtopicIndex) => (
                            <li
                              key={subtopicIndex}
                              className="bg-dark-100 rounded-lg p-3 flex items-center gap-2 shadow-sm border border-border/20"
                            >
                              <span className="text-primary">•</span>
                              <span className="text-light-100">{subtopic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <TimelineForm />

            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              fullWidth
            >
              Generate Study Plan
            </Button>
          </div>
        </form>

        {error && (
          <div className="bg-warning-faded text-warning border border-warning/30 rounded-xl p-6 mt-8 shadow-dark-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}