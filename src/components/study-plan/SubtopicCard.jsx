import React, { useState } from 'react';
import YouTubeSearch from '@/components/youtube/YouTubeSearch';
import SubtopicNotes from '@/components/notes/SubtopicNotes';

const SubtopicCard = ({ subject, topic, subtopic, stepNumber, onCompletionChange }) => {
    const { subTopic, searchTerm, description, focusAreas } = subtopic;
    const [isOpen, setIsOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false); // State to track completion status

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleCompletion = (e) => {
        e.stopPropagation(); // Prevent triggering the dropdown toggle
        const newCompletionStatus = !isCompleted;
        setIsCompleted(newCompletionStatus);
        onCompletionChange(newCompletionStatus); // Notify parent about the change
    };

    return (
        <div className="bg-dark-100 overflow-hidden rounded-md border border-border w-full">
            <button
                className={`p-4 flex gap-3 w-full text-left ${isOpen ? '' : ''}`}
            >
                <div className="flex items-center gap-2">
                    {/* Checkbox for marking completion */}
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={toggleCompletion}
                        className="w-5 h-5 accent-primary cursor-pointer"
                    />
                </div>
                <div onClick={toggleDropdown} className="w-full flex justify-between items-center">
                    <h5 className={`text-md font-semibold text-light-100 ${isOpen ? 'text-primary' : ''} ${isCompleted ? 'line-through opacity-70' : ''}`}>
                        Step {stepNumber}: {subTopic.charAt(0).toUpperCase() + subTopic.slice(1)}
                    </h5>
                    <svg
                        className={`w-5 h-5 text-light-100 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-primary' : ''
                            }`}
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
                </div>
            </button>

            {isOpen && (
                <div className="space-y-3 p-6 pt-0 text-light-200 mt-3 gap-5 flex">
                    <div className="flex-1 max-h-[700px] pr-5 overflow-y-scroll">
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

                        <div className="my-5">{description}</div>

                        <div>
                            <SubtopicNotes
                                subject={subject || ''}
                                topic={topic || ''}
                                subtopic={subTopic}
                            />
                        </div>
                    </div>
                    <div className="w-[550px]">
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