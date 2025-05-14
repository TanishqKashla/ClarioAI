'use client'
import React, { useState } from 'react'
import { CgAddR } from "react-icons/cg";
import { TbLayoutSidebarRightExpand, TbLayoutSidebarLeftExpand } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';

const Sidebar = ({ children }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const sidebarWidth = isOpen ? 187 : 64;

    const handleAddSubjectClick = () => {
        router.push('/newsubject');
    };

    return (
        <>
            {/* Sidebar */}
            <div
                className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-dark-100 text-white border-r border-border overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? 'w-52' : 'w-20'
                    } flex flex-col z-5`}
            >
                <div className="flex items-center  p-4">
                    {/* <span className={`text-lg font-semibold ${!isOpen && 'hidden'}`}>StudySync</span> */}
                    <button onClick={() => setIsOpen(!isOpen)} className="">
                        {isOpen ?<TbLayoutSidebarRightExpand size={25} />: <TbLayoutSidebarLeftExpand size={25} />}
                    </button>
                </div>

                {/* Add Subject Button */}
                <div className="flex justify-center items-center pt-5">
                    <Button
                        children={isOpen ? "Add Subject" : ""} // Show text only when sidebar is open
                        variant="info"
                        size='lg'
                        icon={<CgAddR size={20} />}
                        onClick={handleAddSubjectClick}
                    />
                </div>

                {/* Sidebar Links */}
                <nav className="p-4">
                    <ul>
                        <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
                            {/* Add any links as necessary */}
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <main
                className="transition-all flex-1 duration-300 ease-in-out px-6 mt-0"
                style={{
                    marginLeft: `${sidebarWidth}px`,
                    marginTop: 'px',  // Same as mt-16 for the Navbar height
                }}
            >
                {children}
            </main>
        </>
    );
}

export default Sidebar;
