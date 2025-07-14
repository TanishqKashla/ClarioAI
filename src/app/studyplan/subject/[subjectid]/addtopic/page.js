"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";
import SignInOverlay from "@/components/auth/SignInOverlay";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { showRateLimitNotification } from "@/lib/notifications";

const AddTopicPage = () => {
  const { subjectid } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [subject, setSubject] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topicName, setTopicName] = useState("");
  const [subtopics, setSubtopics] = useState(["", ""]);
  const [bulkSubtopics, setBulkSubtopics] = useState("");
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [formError, setFormError] = useState("");
  const [showSignInOverlay, setShowSignInOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch subject and planId
  useEffect(() => {
    const fetchSubject = async () => {
      setLoading(true);
      const res = await fetch("/api/studyplans");
      const plans = await res.json();
      let foundSubject = null;
      let foundPlanId = null;
      for (const plan of plans) {
        const subj = plan.studyPlan.find((sub) => sub.subjectId === subjectid);
        if (subj) {
          foundSubject = subj;
          foundPlanId = plan.id;
          break;
        }
      }
      setSubject(foundSubject);
      setPlanId(foundPlanId);
      setLoading(false);
    };
    fetchSubject();
  }, [subjectid]);

  const handleAddSubtopic = () => {
    setSubtopics([...subtopics, ""]);
  };

  const handleDeleteSubtopic = (indexToDelete) => {
    if (subtopics.length <= 1) return;
    setSubtopics(subtopics.filter((_, idx) => idx !== indexToDelete));
  };

  const handleSubtopicChange = (index, value) => {
    const newSubtopics = [...subtopics];
    newSubtopics[index] = value;
    setSubtopics(newSubtopics);
  };

  const handleToggleMode = () => {
    if (isBulkMode) {
      setSubtopics(["", ""]);
    } else {
      const validSubtopics = subtopics.filter((st) => st.trim());
      setBulkSubtopics(validSubtopics.join("\n"));
    }
    setIsBulkMode(!isBulkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!session) {
      setShowSignInOverlay(true);
      return;
    }
    if (!subject) {
      setFormError("Subject not found.");
      return;
    }
    if (!topicName.trim()) {
      setFormError("Please enter a topic name");
      return;
    }
    let validSubtopics = [];
    if (isBulkMode) {
      if (bulkSubtopics.trim()) {
        validSubtopics = [bulkSubtopics.trim()];
      }
    } else {
      validSubtopics = subtopics.filter((st) => st.trim());
    }
    if (validSubtopics.length === 0) {
      setFormError("Please enter at least one subtopic");
      return;
    }
    setIsLoading(true);
    try {
      // Generate the new topic structure via Groq
      const groqRes = await fetch("/api/generate-study-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studyPlan: [
            {
              name: subject.subjectName || subject.name,
              topics: [
                {
                  name: topicName,
                  subtopics: validSubtopics,
                },
              ],
            },
          ],
        }),
      });
      const groqResult = await groqRes.json();
      if (!groqRes.ok) {
        if (groqRes.status === 429) {
          showRateLimitNotification(
            groqResult.message ||
            "Rate limit exceeded. You can only generate 3 study plans per day."
          );
        } else {
          setFormError(groqResult.error || "Failed to generate topic. Please try again.");
        }
        setIsLoading(false);
        return;
      }
      if (!groqResult.success || !groqResult.studyPlan?.[0]?.topics?.[0]) {
        setFormError("Failed to generate topic. Please try again.");
        setIsLoading(false);
        return;
      }
      // Add IDs to the new topic and subtopics
      const newTopic = {
        ...groqResult.studyPlan[0].topics[0],
        topicId: nanoid(),
        subtopics: groqResult.studyPlan[0].topics[0].subtopics.map((sub) => ({
          ...sub,
          subtopicId: nanoid(),
        })),
      };
      // Append the new topic to the subject's topics array
      const updatedTopics = [...(subject.topics || []), newTopic];
      // Build the updated study plan for PATCH
      const patchRes = await fetch("/api/studyplans", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          subjectId: subjectid,
          // We use a custom flag to indicate topic append
          newTopics: updatedTopics,
          // For backward compatibility, also send topicId (not used in PATCH handler, but for future-proofing)
        }),
      });
      if (patchRes.ok) {
        // Success: redirect to subject page
        router.push(`/studyplan/subject/${subjectid}`);
        window.dispatchEvent(new Event("studyPlanUpdated"));
      } else {
        setFormError("Failed to add topic. Please try again.");
      }
    } catch (err) {
      setFormError("Failed to add topic. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <div className="text-light-100 p-4">Loading...</div>;
  if (!subject) return <div className="text-light-100 p-4">Subject not found.</div>;

  return (
    <div className="min-h-screen p-3 md:p-8">
      <div className="max-w-2xl p-5 mx-auto bg-card rounded-xl border border-border">
        <h1 className="text-2xl font-bold text-light-100 mb-8 font-styrene">Add Topic</h1>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={isLoading}>
            <div className="space-y-6">
              <div>
                <h3 className="text-light-100 mb-2 font-styrene">Subject Name</h3>
                <input
                  type="text"
                  value={subject.subjectName || subject.name || ""}
                  disabled
                  className="w-full bg-inherit border p-3 rounded-md text-light-100 placeholder:text-light-300 focus:outline-none focus:ring-2 focus:ring-primary transition-colors opacity-70"
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
                    <span className="text-light-300 text-xs md:text-md">{isBulkMode ? "Bulk Mode" : "Individual Mode"}</span>
                    <button
                      type="button"
                      onClick={handleToggleMode}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isBulkMode ? "bg-background" : "bg-secondary"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isBulkMode ? "translate-x-6" : "translate-x-1"}`}
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
            {formError && (
              <div className="mt-4 p-3 bg-warning-faded text-warning rounded-lg border border-warning/30">
                {formError}
              </div>
            )}
            <Button
              type="submit"
              disabled={!topicName || isLoading}
              className="mt-8 w-full"
            >
              {isLoading ? <><Loader2 className="animate-spin mr-2" /> Adding...</> : "Add Topic"}
            </Button>
          </fieldset>
        </form>
        <SignInOverlay
          isOpen={showSignInOverlay}
          onClose={() => setShowSignInOverlay(false)}
        />
      </div>
    </div>
  );
};

export default AddTopicPage;