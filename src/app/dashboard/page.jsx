'use client';

import { useSession } from 'next-auth/react';
import UsageDisplay from '@/components/UsageDisplay';
import RecentStudyPlans from '@/components/RecentStudyPlans';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-light-100">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-light-100">Please sign in to access the dashboard.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-light-100 mb-2">Welcome back, {session.user.name}!</h1>
          <p className="text-light-200">Manage your study plans and track your usage.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-light-100 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/newsubject">
                <Button className="w-full justify-start">
                  Create New Study Plan
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full justify-start">
                  View All Study Plans
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <UsageDisplay />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-light-100 mb-4">Recent Study Plans</h2>
          <RecentStudyPlans />
        </div>
      </div>
    </div>
  );
}
