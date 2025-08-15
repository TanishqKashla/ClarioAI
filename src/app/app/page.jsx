'use client';

import { useSession } from 'next-auth/react';
import UsageDisplay from '@/components/UsageDisplay';
import RecentStudyPlans from '@/components/RecentStudyPlans';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AppSkeleton from '@/components/skeleton-loaders/AppSkeleton';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
   return <AppSkeleton />
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
                  Add New Subject
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full justify-start">
                  View All Subjects
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <UsageDisplay />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-light-100 mb-4">Recent Subjects</h2>
          <RecentStudyPlans />
        </div>
      </div>
    </div>
  );
}

// import { Button } from '@/components/ui/button'
// import { Plus } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// const page = () => {
//     return (
//         <div className='h-[100%]'>
//             <div className='flex flex-col items-center gap-4 pt-28 h-full'>
//                 <div className="relative w-40 h-40 md:w-72 md:h-72">
//                     <Image
//                         src="/illustrations/illustration1.png"
//                         alt="hero"
//                         fill
//                         className="object-contain"
//                     />
//                 </div>
//                 <h2 className='text-light-100 font-bold text-md md:text-2xl'>Start by adding your first subject</h2>
//                 <Button asChild className="max-w-52 mx-auto">
//                     <Link href="/newsubject"> <Plus /> Add Subject</Link>
//                 </Button>
//             </div>
//         </div>
//     )
// }

// export default page
