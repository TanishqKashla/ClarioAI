'use client';

import { useStudyPlan } from '@/contexts/StudyPlanContext';
import StudyPlanList from '@/components/study-plan/StudyPlanList';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StudyPlanPage() {
  const { studyPlan } = useStudyPlan();
  const router = useRouter();

  useEffect(() => {
    // If there's no study plan, redirect back to the form
    if (!studyPlan || studyPlan.length === 0) {
      router.push('/newsubject');
    }
  }, [studyPlan, router]);

  if (!studyPlan || studyPlan.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-200 py-12">
      <div className="mx-auto px-4">
        <StudyPlanList studyPlan={studyPlan} />
      </div>
    </div>
  );
} 