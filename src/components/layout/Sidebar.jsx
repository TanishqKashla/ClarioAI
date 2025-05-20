'use client'
import React, { useState, useEffect } from 'react'
import { CgAddR } from "react-icons/cg";
import { TbLayoutSidebarRightExpand, TbLayoutSidebarLeftExpand } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';
import { IoTrashOutline } from "react-icons/io5";

const Sidebar = ({ children }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(null);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const res = await fetch('/api/studyplans');
            const data = await res.json();
            setPlans(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch plans:', error);
            setLoading(false);
        }
    };

    const sidebarWidth = isOpen ? 240 : 64;

    const handleAddSubjectClick = () => {
        router.push('/newsubject');
    };

    const handleSubjectClick = (subjectId) => {
        router.push(`/studyplan/subject/${subjectId}`);
    };

    const handleDeleteClick = (e, plan, subject) => {
        e.stopPropagation(); // Prevent triggering the subject click
        setSubjectToDelete({ plan, subject });
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        if (!subjectToDelete) return;

        try {
            const response = await fetch(`/api/studyplans?planId=${subjectToDelete.plan.id}&subjectId=${subjectToDelete.subject.subjectId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Refresh the plans list
                await fetchPlans();
                // If we're on the deleted subject's page, redirect to home
                if (window.location.pathname.includes(subjectToDelete.subject.subjectId)) {
                    router.push('/');
                }
            } else {
                console.error('Failed to delete subject');
            }
        } catch (error) {
            console.error('Error deleting subject:', error);
        } finally {
            setShowDeleteConfirm(false);
            setSubjectToDelete(null);
        }
    };

    console.log('From sidebar', plans);

    return (
        <>
            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-dark-100 p-6 rounded-lg max-w-md w-full mx-4">
                        <h3 className="text-xl font-semibold text-light-100 mb-4">Delete Subject</h3>
                        <p className="text-light-300 mb-6">
                            Are you sure you want to delete "{subjectToDelete?.subject.subjectName}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 text-light-100 hover:text-primary transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-dark-100 text-white border-r border-border overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'
                    } flex flex-col z-5`}
            >
                <div className="flex items-center  p-4">
                    {/* <span className={`text-lg font-semibold ${!isOpen && 'hidden'}`}>StudySync</span> */}
                    <button onClick={() => setIsOpen(!isOpen)} className="">
                        {isOpen ? <TbLayoutSidebarRightExpand size={25} /> : <TbLayoutSidebarLeftExpand size={25} />}
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
                    {isOpen ? (
                        <ul className='my-5'>
                            <h3 className='text-xs font-bold mb-4'>Your Subjects</h3>
                            {loading ? (
                                <div className="flex justify-center items-center py-4">
                                    <svg className="animate-spin h-6 w-6 text-info" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            ) : plans.length ? (
                                plans.map(plan => (
                                    plan.studyPlan.map((subject, idx) => (
                                        <li
                                            key={subject.subjectId || idx}
                                            className="text-base mb-2 text-white hover:text-primary hover:bg-secondary p-1.5 rounded-lg cursor-pointer truncate group flex items-center justify-between"
                                            onClick={() => handleSubjectClick(subject.subjectId)}
                                        >
                                            <span className="truncate block flex-1">
                                                {subject.subjectName}
                                            </span>
                                            <button
                                                onClick={(e) => handleDeleteClick(e, plan, subject)}
                                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-opacity"
                                            >
                                                <IoTrashOutline size={18} />
                                            </button>
                                        </li>
                                    ))
                                ))
                            ) : (
                                <p className="text-sm text-light-100">No study plans found.</p>
                            )}
                        </ul>) : (" ")
                    }
                </nav>
            </div>

            {/* Main Content */}
            <main
                className="transition-all flex-1 duration-300 ease-in-out mt-0"
                style={{
                    marginLeft: `${sidebarWidth + 20}px`,
                    marginTop: 'px',  // Same as mt-16 for the Navbar height
                }}
            >
                {children}
            </main>
        </>
    );
}

export default Sidebar;
