import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const TotalSubject = ({ studyPlans }) => {

    return (
        <div className="bg-dark-200 border max-w-full xs:max-w-40 sm:max-w-full border-border rounded-lg p-4 mb-4">
            <h3 className='font-styrene font-semibold'>Total Subjects</h3>
            <div className='w-full text-5xl mt-4 flex justify-center'>{studyPlans ? (`${studyPlans.length}`) : (`0`) }</div>
            

        </div>
    )
}

export default TotalSubject