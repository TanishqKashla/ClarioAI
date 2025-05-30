import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='h-[100vh]'>
            <div className='flex flex-col items-center gap-4 pt-28 h-full'>
                <div className="relative w-40 h-40 md:w-72 md:h-72">
                    <Image
                        src="/illustrations/illustration1.png"
                        alt="hero"
                        fill
                        className="object-contain"
                    />
                </div>
                <h2 className='text-light-100 font-bold text-md md:text-2xl'>Start by adding your first subject</h2>
                <Button asChild className="max-w-52 mx-auto">
                    <Link href="/newsubject"> <Plus /> Add Subject</Link>
                </Button>
            </div>
        </div>
    )
}

export default page
