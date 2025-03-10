'use client';

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
    <div className="container">
      <header className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
          StudySync
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          Your intelligent exam planning companion
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>Syllabus Details</h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                className="input"
                placeholder="Enter subject name"
                value={currentSubject}
                onChange={(e) => setCurrentSubject(e.target.value)}
              />
              <button type="button" className="btn" onClick={addSubject}>
                Add Subject
              </button>
            </div>

            {subjects.map((subject, subjectIndex) => (
              <div key={subjectIndex} style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  marginBottom: '1rem', 
                  color: 'var(--primary-color)',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>📚</span> {subject.name}
                </h3>

                <div style={{ marginBottom: '1rem' }}>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter topic name"
                    value={currentTopic}
                    onChange={(e) => setCurrentTopic(e.target.value)}
                    style={{ marginBottom: '0.5rem' }}
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter subtopics (comma-separated)"
                    value={currentSubtopics}
                    onChange={(e) => setCurrentSubtopics(e.target.value)}
                    style={{ marginBottom: '0.5rem' }}
                  />
                  <button
                    type="button"
                    className="btn"
                    onClick={() => addTopic(subjectIndex)}
                  >
                    Add Topic
                  </button>
                </div>

                <div style={{ marginLeft: '1rem' }}>
                  {subject.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} style={{ marginBottom: '1rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ color: 'var(--primary-color)', fontWeight: '600' }}>
                          📑 {topic.name}
                        </span>
                      </div>
                      <ul style={{ 
                        listStyle: 'none', 
                        padding: '0',
                        marginLeft: '1.5rem'
                      }}>
                        {topic.subtopics.map((subtopic, subtopicIndex) => (
                          <li
                            key={subtopicIndex}
                            style={{
                              padding: '0.5rem',
                              background: '#f1f5f9',
                              borderRadius: '0.5rem',
                              marginBottom: '0.5rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}
                          >
                            <span>•</span>
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

          <div className="card" style={{ background: '#f8fafc' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>Study Timeline</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64748b' }}>
                  Days
                </label>
                <input
                  type="number"
                  className="input"
                  value={studyTime.days}
                  onChange={(e) => setStudyTime({ ...studyTime, days: e.target.value })}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64748b' }}>
                  Hours per Day
                </label>
                <input
                  type="number"
                  className="input"
                  value={studyTime.hours}
                  onChange={(e) => setStudyTime({ ...studyTime, hours: e.target.value })}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#64748b' }}>
                  Weeks
                </label>
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
            className="btn"
            style={{
              marginTop: '2rem',
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Generating Study Plan...' : 'Generate Study Plan'}
          </button>
        </div>
      </form>

      {error && (
        <div className="card" style={{ background: '#fee2e2', color: '#991b1b' }}>
          {error}
        </div>
      )}

      {studyPlan.length > 0 && (
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>Your Study Plan</h2>
          {studyPlan.map((subject, subjectIndex) => (
            <div key={subjectIndex} style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
                color: 'var(--primary-color)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>📚</span> {subject.subject}
              </h3>
              
              {subject.topics.map((topic, topicIndex) => (
                <div key={topicIndex} style={{ marginBottom: '1.5rem', marginLeft: '1rem' }}>
                  <h4 style={{ 
                    fontSize: '1.4rem',
                    color: 'var(--text-color)',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>📑</span> {topic.topic}
                  </h4>

                  <div style={{ marginLeft: '1rem' }}>
                    {topic.subtopics.map((subtopic, subtopicIndex) => (
                      <div 
                        key={subtopicIndex}
                        style={{
                          background: '#f8fafc',
                          borderRadius: '0.75rem',
                          padding: '1.5rem',
                          marginBottom: '1rem',
                          border: '1px solid #e2e8f0'
                        }}
                      >
                        <h5 style={{ 
                          fontSize: '1.2rem',
                          color: 'var(--primary-color)',
                          marginBottom: '0.75rem'
                        }}>
                          {subtopic.subTopic}
                        </h5>
                        
                        <div style={{ marginBottom: '0.75rem' }}>
                          <strong style={{ color: '#64748b' }}>YouTube Search: </strong>
                          <span>{subtopic.searchTerm}</span>
                        </div>

                        <div style={{ marginBottom: '0.75rem' }}>
                          <strong style={{ color: '#64748b' }}>Description: </strong>
                          <span>{subtopic.description}</span>
                        </div>

                        <div style={{ marginBottom: '0.75rem' }}>
                          <strong style={{ color: '#64748b' }}>Time Alloted: </strong>
                          <span>{subtopic.timeAlloted}</span>
                        </div>

                        <div>
                          <strong style={{ color: '#64748b' }}>Focus Areas: </strong>
                          <ul style={{ 
                            listStyle: 'none', 
                            padding: '0',
                            marginTop: '0.5rem',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem'
                          }}>
                            {subtopic.focusAreas.map((area, areaIndex) => (
                              <li
                                key={areaIndex}
                                style={{
                                  background: '#e2e8f0',
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: '1rem',
                                  fontSize: '0.9rem'
                                }}
                              >
                                {area}
                              </li>
                            ))}
                          </ul>
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
  );
}