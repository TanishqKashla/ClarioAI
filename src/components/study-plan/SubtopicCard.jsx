import React, { useState } from 'react';
import YouTubeSearch from '@/components/youtube/YouTubeSearch';
import SubtopicNotes from '@/components/notes/SubtopicNotes';

const SubtopicCard = ({ subject, topic, subtopic }) => {
    const { subTopic, searchTerm, description, timeAlloted, focusAreas } = subtopic;
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-dark-100 overflow-hidden rounded-md border border-border w-full ">
            <button
                onClick={toggleDropdown}
                className={`flex items-center p-4 justify-between w-full text-left ${isOpen ? '' : ''}`}
            >
                <h5 className={`text-md font-semibold text-light-100 ${isOpen ? 'text-primary' : ''}`}>
                    Step 1 : {subTopic.charAt(0).toUpperCase() + subTopic.slice(1)}
                </h5>
                <svg
                    className={`w-5 h-5 text-light-100 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-primary' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="space-y-3 p-6 pt-0   text-light-200 mt-3 flex gap-5">
                    <div className='flex-1 h-[500px] overflow-scroll'>
                        <div>
                            <span className="font-medium text-light-100 block mb-2">Focus Areas: </span>
                            <ul className="flex flex-wrap gap-2">
                                {focusAreas.map((area, index) => (
                                    <li
                                        key={index}
                                        className="info px-3 py-1 rounded-full text-sm text-primary border border-primary/20"
                                    >
                                        {area}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            {/* <span className="font-medium text-light-100">Description: </span> */}
                            {description}
                        </div>


                        <div>
                            <span className="font-medium text-light-100">Time Alloted: </span>
                            {timeAlloted}
                        </div>


                        <div>
                            <SubtopicNotes
                                subject={subject || ''}
                                topic={topic || ''}
                                subtopic={subTopic}
                            />
                        </div>
                    </div>
                    <div className=' w-[600px]'>
                        <span className="font-medium text-light-100">YouTube Search: </span>
                        {searchTerm}
                        <YouTubeSearch searchTerm={searchTerm} isOpen={isOpen} />
                    </div>
                </div>
            )}
        </div>

    );
};

export default SubtopicCard;