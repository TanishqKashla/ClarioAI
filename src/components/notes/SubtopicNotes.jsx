'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { showRateLimitNotification } from "@/lib/notifications";

const SubtopicNotes = ({ subject, topic, subtopic, planId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [notes, setNotes] = useState(subtopic.aiNotes || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
    const [userFeedback, setUserFeedback] = useState('');
    const [regenerating, setRegenerating] = useState(false);
    console.log("PRINTING FROM SUBTOPICNOTES", subject, topic);

    const handleGenerateNotes = async () => {
        if (!subject || !topic || !subtopic) return;

        setLoading(true);
        setError(null);

        try {
            console.log("Generating notes for:", subject.subjectName, topic.name, subtopic.name);
            
            // Call the new API route with rate limiting
            const response = await fetch('/api/ai-notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: subject.subjectName,
                    topic: topic.name,
                    subtopic: subtopic.name
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 429) {
                    showRateLimitNotification(data.message || 'Rate limit exceeded. Please try again tomorrow.');
                } else {
                    setError(data.error || 'Failed to generate notes. Please try again.');
                }
                return;
            }

            setNotes(data.notes);

            // Store the generated notes in the database
            await fetch('/api/studyplans', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId,
                    subjectId: subject.subjectId,
                    topicId: topic.topicId,
                    subtopicId: subtopic.subtopicId,
                    aiNotes: data.notes
                }),
            });
        } catch (err) {
            setError('Failed to generate notes. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegenerateNotes = async () => {
        if (!subject || !topic || !subtopic || !userFeedback) return;

        setRegenerating(true);
        setError(null);

        try {
            // Call the new API route for regeneration with rate limiting
            const response = await fetch('/api/regenerate-notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject: subject.subjectName,
                    topic: topic.name,
                    subtopic: subtopic.name,
                    userFeedback,
                    previousNotes: notes
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 429) {
                    showRateLimitNotification(data.message || 'Rate limit exceeded. You can only regenerate once per day.');
                } else {
                    setError(data.error || 'Failed to regenerate notes. Please try again.');
                }
                return;
            }

            setNotes(data.notes);

            // Store the regenerated notes in the database
            await fetch('/api/studyplans', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId,
                    subjectId: subject.subjectId,
                    topicId: topic.topicId,
                    subtopicId: subtopic.subtopicId,
                    aiNotes: data.notes
                }),
            });

            setShowFeedbackDialog(false);
            setUserFeedback('');
        } catch (err) {
            setError('Failed to regenerate notes. Please try again.');
            console.error(err);
        } finally {
            setRegenerating(false);
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
                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-white bg-dark-200 border border-border rounded-md hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
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
                <div className="mt-2 bg-dark-300 p-4 rounded-md border border-border shadow-sm text-light-200">
                    {loading && <div className="text-center py-4">Generating expert notes...</div>}
                    {error && <div className="text-warning py-2">{error}</div>}
                    {notes && (
                        <>
                            <div className="prose prose-sm max-w-none prose-invert">
                                <ReactMarkdown>{notes}</ReactMarkdown>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="text-sm">
                                            Regenerate with Feedback
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] bg-popover border-border">
                                        <DialogHeader>
                                            <DialogTitle className="text-light-100">Provide Feedback</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <Textarea
                                                placeholder="What would you like to see improved in these notes?"
                                                value={userFeedback}
                                                onChange={(e) => setUserFeedback(e.target.value)}
                                                className="bg-dark-200 border-border text-light-100"
                                            />
                                            <Button
                                                onClick={handleRegenerateNotes}
                                                disabled={!userFeedback || regenerating}
                                                className="w-full"
                                            >
                                                {regenerating ? 'Regenerating...' : 'Regenerate Notes'}
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubtopicNotes;