'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateSubtopicNotes } from '@/services/groqService';

const SubtopicNotes = ({ subject, topic, subtopic }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerateNotes = async () => {
        if (!subject || !topic || !subtopic) return;

        setLoading(true);
        setError(null);

        try {
            const result = await generateSubtopicNotes(subject, topic, subtopic);
            setNotes(result);
        } catch (err) {
            setError('Failed to generate notes. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen && !notes) {
            handleGenerateNotes();
        }
    };

    return (
        <div className="mt-3">
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            >
                <span>Generate Expert Notes</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
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
                <div className="mt-2 bg-white p-4 rounded-md border border-slate-200 shadow-sm">
                    {loading && <div className="text-center py-4">Generating expert notes...</div>}
                    {error && <div className="text-red-500 py-2">{error}</div>}
                    {notes && (
                        <div className="prose prose-sm max-w-none">
                            <ReactMarkdown>{notes}</ReactMarkdown>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubtopicNotes;