'use client'
import React from 'react'
import { CgAddR } from "react-icons/cg";
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import Button from '../common/Button';

const Sidebar = () => {
    const router = useRouter(); // Initialize the router

    const handleAddSubjectClick = () => {
        router.push('/newsubject'); // Redirect to /newsubject
    };


    return (
        <aside className="bg-dark-100 w-52 border-r border-border overflow-y-auto h-[calc(100vh-62px)] fixed">
            <div className=" flex justify-center items-center pt-5">
                <Button
                    children={"Add Subject"}
                    variant='info'
                    size='lg'
                    icon={<CgAddR size={20} />}
                    onClick={handleAddSubjectClick}
                    
                />
            </div>

        </aside>
    )
}

export default Sidebar