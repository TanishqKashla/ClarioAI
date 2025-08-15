'use client';

import { useSession } from 'next-auth/react';
import UsageDisplay from '@/components/UsageDisplay';
import RecentStudyPlans from '@/components/RecentStudyPlans';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AppSkeleton from '@/components/skeleton-loaders/AppSkeleton';
import { SquarePen } from 'lucide-react';
import Image from 'next/image';
import TotalSubject from '@/components/TotalSubject';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function DashboardPage() {

  const router = useRouter();
  const { data: session, status } = useSession();
  const [studyPlans, setStudyPlans] = useState([]);

  useEffect(() => {
    if (session) {
      fetchStudyPlans();
    }
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [session]);

  const fetchStudyPlans = async () => {
    try {
      const response = await fetch('/api/studyplans');
      const data = await response.json();

      if (Array.isArray(data)) {
        setStudyPlans(data);
      }
    } catch (error) {
      console.error('Failed to fetch study plans:', error);
    }
  };

  if (status === 'loading') {
    return <AppSkeleton />
  }

  if (!session) {
    return (
      <div className='h-[100%]'>
        <div className='flex flex-col items-center gap-4 pt-28 h-full'>
          <div className="relative w-40 h-40 md:w-72 md:h-72">
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
      </div>
    );
  }

  return (
    <div className="p-6 px-8 md:px-12">
      <div className="">
        <div className="mb-8 flex justify-between flex-col gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-bold text-light-100 mb-2 font-styrene">Welcome,<span className='text-[#a9d47f]'>{session.user.name}</span>!</h1>
            <p className="text-light-200">Manage your subjects and track your usage.</p>
          </div>
          <div className="flex gap-3">
            {/* <Link href="/app">
              <Button variant="outline" className="w-full justify-start">
                View All Subjects
              </Button>
            </Link> */}
            <Link href="/newsubject">
              <Button className="w-full justify-start">
                Add New Subject
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-between flex-col-reverse sm:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-xl font-medium font-styrene text-light-100 mb-4">Recent Subjects</h2>
            <RecentStudyPlans studyPlans={studyPlans} />
          </div>
          <div className='sm:w-[200px] flex flex-col xs:flex-row-reverse justify-center sm:justify-start sm:flex-col xs:gap-4 sm:gap-0 '>
            <UsageDisplay />
            <TotalSubject studyPlans={studyPlans} />
          </div>
        </div>

      </div>
    </div>
  );
}