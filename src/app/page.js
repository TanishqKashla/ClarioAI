'use client';

import YouTubeSearch from './components/YouTubeSearch';
import { useState } from 'react';
import { generateStudyPlan } from './services/groqService';

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState('');
  const [currentTopic, setCurrentTopic] = useState('');
  const [currentSubtopics, setCurrentSubtopics] = useState('');
  const [studyTime, setStudyTime] = useState({
    days: '',
    hours: '',
    weeks: ''
  });
  const [studyPlan, setStudyPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const addSubject = () => {
    if (currentSubject.trim()) {
      setSubjects([...subjects, { name: currentSubject, topics: [] }]);
      setCurrentSubject('');
    }
  };

  const addTopic = (subjectIndex) => {
    if (currentTopic.trim() && currentSubtopics.trim()) {
      const newSubjects = [...subjects];
      const subtopicsList = currentSubtopics.split(',').map(st => st.trim()).filter(st => st);
      newSubjects[subjectIndex].topics.push({
        name: currentTopic,
        subtopics: subtopicsList
      });
      setSubjects(newSubjects);
      setCurrentTopic('');
      setCurrentSubtopics('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setStudyPlan([]);

    try {
      const plan = await generateStudyPlan({
        subjects,
        studyTime
      });
      setStudyPlan(plan);
    } catch (err) {
      setError('Failed to generate study plan. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="bg-white rounded-2xl p-8 shadow-xl mb-8 text-center transform hover:scale-[1.02] transition-transform">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
            StudySync
          </h1>
          <p className="text-slate-600 text-lg">
            Your intelligent exam planning companion
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Syllabus Details</h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  className="input flex-1"
                  placeholder="Enter subject name"
                  value={currentSubject}
                  onChange={(e) => setCurrentSubject(e.target.value)}
                />
                <button type="button" className="btn whitespace-nowrap" onClick={addSubject}>
                  Add Subject
                </button>
              </div>

              {subjects.map((subject, subjectIndex) => (
                <div key={subjectIndex} className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-4">
                    <span>📚</span> {subject.name}
                  </h3>

                  <div className="space-y-4 mb-6">
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter topic name"
                      value={currentTopic}
                      onChange={(e) => setCurrentTopic(e.target.value)}
                    />
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter subtopics (comma-separated)"
                      value={currentSubtopics}
                      onChange={(e) => setCurrentSubtopics(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn w-full sm:w-auto"
                      onClick={() => addTopic(subjectIndex)}
                    >
                      Add Topic
                    </button>
                  </div>

                  <div className="pl-4">
                    {subject.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-primary font-semibold flex items-center gap-2">
                            📑 {topic.name}
                          </span>
                        </div>
                        <ul className="space-y-2 pl-6">
                          {topic.subtopics.map((subtopic, subtopicIndex) => (
                            <li
                              key={subtopicIndex}
                              className="bg-white rounded-lg p-3 flex items-center gap-2 shadow-sm"
                            >
                              <span className="text-primary">•</span>
                              <span>{subtopic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 rounded-xl p-6 mt-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">Study Timeline</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-slate-600 mb-2">Days</label>
                  <input
                    type="number"
                    className="input"
                    value={studyTime.days}
                    onChange={(e) => setStudyTime({ ...studyTime, days: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-2">Hours per Day</label>
                  <input
                    type="number"
                    className="input"
                    value={studyTime.hours}
                    onChange={(e) => setStudyTime({ ...studyTime, hours: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-2">Weeks</label>
                  <input
                    type="number"
                    className="input"
                    value={studyTime.weeks}
                    onChange={(e) => setStudyTime({ ...studyTime, weeks: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`btn w-full mt-8 py-4 text-lg font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              disabled={isLoading}
            >
              {isLoading ? 'Generating Study Plan...' : 'Generate Study Plan'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 text-red-800 rounded-xl p-6 mt-8 shadow-lg">
            {error}
          </div>
        )}

        {studyPlan.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg mt-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">Your Study Plan</h2>
            {studyPlan.map((subject, subjectIndex) => (
              <div key={subjectIndex} className="mb-8">
                <h3 className="text-2xl font-bold text-primary flex items-center gap-2 mb-4">
                  <span>📚</span> {subject.subject}
                </h3>

                {subject.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="mb-6 ml-4">
                    <h4 className="text-xl font-semibold text-slate-800 flex items-center gap-2 mb-4">
                      <span>📑</span> {topic.topic}
                    </h4>

                    <div className="space-y-4 ml-4">
                      {topic.subtopics.map((subtopic, subtopicIndex) => (
                        <div
                          key={subtopicIndex}
                          className="bg-slate-50 rounded-xl p-6 border border-slate-200"
                        >
                          <h5 className="text-lg font-semibold text-primary mb-3">
                            {subtopic.subTopic}
                          </h5>

                          <div className="space-y-3 text-slate-700">
                            <div>
                              <span className="font-medium text-slate-600">YouTube Search: </span>
                              {subtopic.searchTerm}
                            </div>

                            <div>
                              <span className="font-medium text-slate-600">notes: </span>
                              {subtopic.notes}
                            </div>

                            <div>
                              <span className="font-medium text-slate-600">Time Alloted: </span>
                              {subtopic.timeAlloted}
                            </div>

                            <div>
                              <span className="font-medium text-slate-600 block mb-2">Focus Areas: </span>
                              <ul className="flex flex-wrap gap-2">
                                {subtopic.focusAreas.map((area, areaIndex) => (
                                  <li
                                    key={areaIndex}
                                    className="bg-white px-3 py-1 rounded-full text-sm text-primary border border-primary/20"
                                  >
                                    {area}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <YouTubeSearch />
    </div>
  );
}