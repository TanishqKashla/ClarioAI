'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { getSession, useSession } from 'next-auth/react';
import { nanoid } from 'nanoid';
import SignInOverlay from '@/components/auth/SignInOverlay';
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';
import { showRateLimitNotification } from "@/lib/notifications";

//check if the user is logged in


export default function NewSubjectPage() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const [subjectName, setSubjectName] = useState('');
  const [topicName, setTopicName] = useState('');
  const [subtopics, setSubtopics] = useState(['', '']);
  const [bulkSubtopics, setBulkSubtopics] = useState('');
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [formError, setFormError] = useState('');
  const [showSignInOverlay, setShowSignInOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSubtopic = () => {
    setSubtopics([...subtopics, '']);
  };

  const handleDeleteSubtopic = (indexToDelete) => {
    // Don't allow deleting if there's only one subtopic field
    if (subtopics.length <= 1) {
      return;
    }

    const newSubtopics = subtopics.filter((_, index) => index !== indexToDelete);
    setSubtopics(newSubtopics);
  };

  const handleSubtopicChange = (index, value) => {
    const newSubtopics = [...subtopics];
    newSubtopics[index] = value;
    setSubtopics(newSubtopics);
  };

  const handleToggleMode = () => {
    if (isBulkMode) {
      // Switching from bulk to individual mode
      // Reset the individual inputs instead of converting
      setSubtopics(['', '']);
    } else {
      // Switching from individual to bulk mode
      // Convert individual subtopics to bulk text
      const validSubtopics = subtopics.filter(st => st.trim());
      setBulkSubtopics(validSubtopics.join('\n'));
    }

    setIsBulkMode(!isBulkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Check if user is authenticated
    if (!session) {
      setShowSignInOverlay(true);
      return;
    }

    // Validate inputs
    if (!subjectName.trim()) {
      setFormError('Please enter a subject name');
      return;
    }

    if (!topicName.trim()) {
      setFormError('Please enter a topic name');
      return;
    }

    // Get valid subtopics based on current mode
    let validSubtopics = [];
    if (isBulkMode) {
      if (bulkSubtopics.trim()) {
        validSubtopics = [bulkSubtopics.trim()];
      }
    } else {
      validSubtopics = subtopics.filter(st => st.trim());
    }

    // Create the subject with topic directly for the context state
    const subject = {
      name: subjectName,
      topics: [{
        name: topicName,
        subtopics: validSubtopics
      }]
    };

    setIsLoading(true);

    try {
      // Call the API route with rate limiting instead of the service directly
      const response = await fetch('/api/generate-study-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studyPlan: [subject]
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          showRateLimitNotification(result.message || 'Rate limit exceeded. You can only generate 3 study plans per day.');
        } else {
          setFormError(result.error || 'Failed to generate study plan. Please try again.');
        }
        return;
      }

      if (result.success) {
        // Add IDs to the generated plan
        const planWithIds = result.studyPlan.map(subject => ({
          ...subject,
          subjectId: nanoid(),
          topics: subject.topics.map(topic => ({
            ...topic,
            topicId: nanoid(),
            subtopics: topic.subtopics.map(subtopic => ({
              ...subtopic,
              subtopicId: nanoid()
            }))
          }))
        }));

        // Save the plan to the database
        const saveResponse = await fetch('/api/studyplans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studyPlan: planWithIds
          }),
        });

        const saveResult = await saveResponse.json();

        if (saveResult.success) {
          console.log("Saved successfully with ID:", saveResult.id);
          // Redirect to the study plan
          router.push(`/studyplan/subject/${planWithIds[0].subjectId}`);
          window.dispatchEvent(new Event('studyPlanUpdated'));
        } else {
          console.error("Save failed:", saveResult.error);
          setFormError('Failed to save study plan. Please try again.');
        }
      } else {
        console.error("Generation failed:", result.error);
        setFormError('Failed to generate study plan. Please try again.');
      }
    } catch (err) {
      setFormError('Failed to generate study plan. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-3 md:p-8">
      <div className="max-w-2xl p-5 mx-auto bg-card rounded-xl border border-border">
        <h1 className="text-2xl font-bold text-light-100 mb-8 font-styrene">New Subject</h1>

        <form onSubmit={handleSubmit} className="">
          <fieldset disabled={isLoading} className="">

            <div className="space-y-6">
              <div>
                <h3 className="text-light-100 mb-2 font-styrene">Subject Name*</h3>
                <input
                  type="text"
                  placeholder="Enter Subject"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full bg-inherit border p-3 rounded-md text-light-100 placeholder:text-light-300 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  required
                />
              </div>

              <div className="ml-0">
                <h3 className="text-light-100 mb-2 font-styrene">Topic Name*</h3>
                <input
                  type="text"
                  placeholder="Enter Topic"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  className="w-full bg-inherit border p-3 rounded-md text-light-100 placeholder:text-light-300 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  required
                />
              </div>

              <div className="ml-0">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-light-100 font-styrene flex flex-col md:flex-none md:flex-row">SubTopic Name <span>(if any)</span></h3>
                  <div className="flex items-center gap-2">
                    <span className="text-light-300 text-xs md:text-md">{isBulkMode ? 'Bulk Mode' : 'Individual Mode'}</span>
                    <button
                      type="button"
                      onClick={handleToggleMode}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isBulkMode ? 'bg-background' : 'bg-secondary'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isBulkMode ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </button>
                  </div>
                </div>

                {isBulkMode ? (
                  <div>
                    <textarea
                      placeholder="Paste your syllabus content here"
                      value={bulkSubtopics}
                      onChange={(e) => setBulkSubtopics(e.target.value)}
                      className="input w-full min-h-[120px] bg-inherit border p-3 rounded-md text-light-100 placeholder:text-light-300 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      rows={5}
                    />
                  </div>
                ) : (
                  <>
                    {subtopics.map((subtopic, index) => (
                      <div key={index} className="mb-2 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={`Enter SubTopic${index + 1}`}
                          value={subtopic}
                          onChange={(e) => handleSubtopicChange(index, e.target.value)}
                          className="w-full bg-inherit border p-3 rounded-md text-light-100 placeholder:text-light-300 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteSubtopic(index)}
                          className="bg-destructive text-warning hover:bg-destructive/70 rounded-md w-8 h-8 flex items-center justify-center flex-shrink-0"
                          disabled={subtopics.length <= 1}
                          title="Delete subtopic"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-center mt-2">
                      <button
                        onClick={handleAddSubtopic}
                        className="bg-secondary text-primary hover:bg-secondary/70 rounded-md w-10 h-10 flex items-center justify-center"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* <div className="mt-8">
              <TimelineForm />
            </div> */}

            {formError && (
              <div className="mt-4 p-3 bg-warning-faded text-warning rounded-lg border border-warning/30">
                {formError}
              </div>
            )}

            {/* <Button
              size='lg'
              type="submit"
              // disabled={isLoading}
              // isLoading={isLoading}
              fullWidth
              className="mt-8"
            >
              Generate Study Plan
            </Button> */}
            <Button
              type="submit"
              disabled={!subjectName || !topicName || isLoading}
              className="mt-8 w-full"
            >
              {isLoading ? <><Loader2 className="animate-spin mr-2" /> Generating</> : 'Generate'}
            </Button>

          </fieldset>
        </form>

        {/* {error && (
          <div className="bg-warning-faded text-warning border border-warning/30 rounded-xl p-6 mt-8 shadow-dark-lg">
            {error}
          </div>
        )} */}
      </div>

      <SignInOverlay
        isOpen={showSignInOverlay}
        onClose={() => setShowSignInOverlay(false)}
      />
    </div>
  );
}