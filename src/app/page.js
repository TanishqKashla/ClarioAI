import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className=' h-full'>
            <div className='flex flex-col items-center gap-4 justify-center h-full'>
                <Image src="/illustrations/illustration1.png" alt="hero" width={300} height={300} />
                <h2 className='text-light-100 font-bold text-2xl'>Start by adding your first subject</h2>
            </div>
        </div>
    )
}

export default page
