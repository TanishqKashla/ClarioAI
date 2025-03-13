'use client';

import { useState } from 'react';
import SubjectForm from '@/components/forms/SubjectForm';
import TopicForm from '@/components/forms/TopicForm';
import TimelineForm from '@/components/forms/TimelineForm';
import Button from '@/components/common/Button';
import StudyPlanList from '@/components/study-plan/StudyPlanList';
import { StudyPlanProvider, useStudyPlan } from '@/contexts/StudyPlanContext';

function StudyPlanContent() {
  const { subjects, studyPlan, isLoading, error, generatePlan } = useStudyPlan();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generatePlan();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="bg-white rounded-2xl p-8 shadow-xl mb-8 text-center transform hover:scale-[1.02] transition-transform">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
            StudySync
          </h1>
          <p className="text-slate-600 text-lg">
            Your intelligent exam planning companion
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Syllabus Details</h2>

            <div className="space-y-8">
              <SubjectForm />

              {subjects.map((subject, subjectIndex) => (
                <div key={subjectIndex} className="bg-slate-50 rounded-xl p-6">
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
                              className="bg-white rounded-lg p-3 flex items-center gap-2 shadow-sm"
                            >
                              <span className="text-primary">•</span>
                              <span>{subtopic}</span>
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
              className="w-full mt-8 py-4 text-lg font-medium"
              disabled={isLoading}
              isLoading={isLoading}
              fullWidth
            >
              Generate Study Plan
            </Button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 text-red-800 rounded-xl p-6 mt-8 shadow-lg">
            {error}
          </div>
        )}

        <div className="mt-10">
          <StudyPlanList studyPlan={studyPlan} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <StudyPlanProvider>
      <StudyPlanContent />
    </StudyPlanProvider>
  );
}