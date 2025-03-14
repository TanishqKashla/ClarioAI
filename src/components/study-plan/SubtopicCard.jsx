import React from 'react';
import YouTubeSearch from '@/components/youtube/YouTubeSearch';
import SubtopicNotes from '@/components/notes/SubtopicNotes';

const SubtopicCard = ({ subject, topic, subtopic }) => {
    const { subTopic, searchTerm, description, timeAlloted, focusAreas } = subtopic;


    return (
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h5 className="text-lg font-semibold text-primary mb-3 uppercase">
                {subTopic}
            </h5>

            <div className="space-y-3 text-slate-700">
                <div>
                    <span className="font-medium text-slate-600">YouTube Search: </span>
                    {searchTerm}
                    <YouTubeSearch searchTerm={searchTerm} />
                </div>

                <div>
                    <span className="font-medium text-slate-600">Description: </span>
                    {description}
                </div>

                <div>
                    <span className="font-medium text-slate-600">Time Alloted: </span>
                    {timeAlloted}
                </div>

                <div>
                    <span className="font-medium text-slate-600 block mb-2">Focus Areas: </span>
                    <ul className="flex flex-wrap gap-2">
                        {focusAreas.map((area, index) => (
                            <li
                                key={index}
                                className="bg-white px-3 py-1 rounded-full text-sm text-primary border border-primary/20"
                            >
                                {area}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <SubtopicNotes
                        subject={subject || ''}
                        topic={topic || ''}
                        subtopic={subTopic}
                    />

                </div>
            </div>
        </div>
    );
};

export default SubtopicCard;