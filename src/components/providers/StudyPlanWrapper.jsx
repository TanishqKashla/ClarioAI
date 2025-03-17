'use client';

import { StudyPlanProvider } from '@/contexts/StudyPlanContext';

export default function StudyPlanWrapper({ children }) {
  return (
    <StudyPlanProvider>
      {children}
    </StudyPlanProvider>
  );
} 