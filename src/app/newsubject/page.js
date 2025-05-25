'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import { useStudyPlan } from '@/contexts/StudyPlanContext';
import { generateStudyPlan } from '@/services/groqService';
import { getSession, useSession } from 'next-auth/react';
import { nanoid } from 'nanoid';
import SignInOverlay from '@/components/auth/SignInOverlay';

//check if the user is logged in


export default function NewSubjectPage() {
  const { data: session, status } = useSession();
  // const { isLoading, error, set, setError, setStudyPlan, setSubjects } = useStudyPlan();
  const router = useRouter();
  const [subjectName, setSubjectName] = useState('');
  const [topicName, setTopicName] = useState('');
  const [subtopics, setSubtopics] = useState(['', '']);
  const [bulkSubtopics, setBulkSubtopics] = useState('');
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [formError, setFormError] = useState('');
  const [showSignInOverlay, setShowSignInOverlay] = useState(false);

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

    // Set subjects in context
    // setSubjects([subject]);

    // // Generate the plan
    // setIsLoading(true);
    // setError('');
    // setStudyPlan([]);

    try {
      const plan = await generateStudyPlan({
        subjects: [subject]
      });

      plan.forEach((subject) => {
        subject.subjectId = nanoid();
        subject.topics.forEach((topic) => {
          topic.topicId = nanoid();
          topic.subtopics.forEach((subtopic) => {
            subtopic.subtopicId = nanoid();
          });
        });
      });

      const res = await fetch('/api/studyplans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.email,
          studyPlan: plan,
        }),
      });

      const result = await res.json();

      if (result.success) {
        console.log("Saved successfully with ID:", result.id);
        // Redirect first, before updating context
        if (plan[0]?.subjectId) {
          router.push(`/studyplan/subject/${plan[0].subjectId}`);
        } else {
          router.push('/studyplan');
        }
        setStudyPlan(plan);
        window.dispatchEvent(new Event('studyPlanUpdated'));
      } else {
        console.error("Save failed:", result.error);
        setError('Failed to save study plan. Please try again.');
      }
    } catch (err) {
      setError('Failed to generate study plan. Please try again.');
      console.error(err);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-200 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-light-100 mb-8 font-styrene">Create New Subject</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-dark-100 rounded-2xl p-8 shadow-dark-lg border border-border/40">
            <h2 className="text-2xl font-semibold text-light-100 mb-6 font-styrene">Syllabus Details</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-light-100 mb-2 font-styrene">Enter Subject Name</h3>
                <input
                  type="text"
                  placeholder="Enter Subject"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="input w-full"
                />
              </div>

              <div className="ml-0">
                <h3 className="text-light-100 mb-2 font-styrene">Enter Topic Name</h3>
                <input
                  type="text"
                  placeholder="Enter Topic"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  className="input w-full"
                />
              </div>

              <div className="ml-0">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-light-100 font-styrene">Enter SubTopic Name (if any)</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-light-300 text-sm">{isBulkMode ? 'Bulk Mode' : 'Individual Mode'}</span>
                    <button
                      type="button"
                      onClick={handleToggleMode}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isBulkMode ? 'bg-primary' : 'bg-dark-300'}`}
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
                      className="input w-full min-h-[120px]"
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
                          className="input w-full"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteSubtopic(index)}
                          className="bg-warning-faded text-warning hover:bg-warning/20 rounded-md w-8 h-8 flex items-center justify-center flex-shrink-0"
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
                        className="bg-dark-300 text-primary hover:bg-dark-400 rounded-md w-10 h-10 flex items-center justify-center"
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

            <Button
              size='lg'
              type="submit"
              // disabled={isLoading}
              // isLoading={isLoading}
              fullWidth
              className="mt-8"
            >
              Generate Study Plan
            </Button>
          </div>
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