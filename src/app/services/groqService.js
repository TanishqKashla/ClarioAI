import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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", // Replace with your actual API key
  dangerouslyAllowBrowser: true // Enable browser usage
});

export async function generateStudyPlan(request) {
  const prompt = `As an expert study planner, analyze the following syllabus and provide a structured study plan in JSON format.

Syllabus Details:
${request.subjects.map(subject => `
Subject: ${subject.name}
Topics:
${subject.topics.map(topic => `
  - ${topic.name}
    Subtopics:
    ${topic.subtopics.map(subtopic => `    * ${subtopic}`).join('\n')}
`).join('\n')}
`).join('\n')}

Study Timeline:
- Days: ${request.studyTime.days}
- Hours per day: ${request.studyTime.hours}
- Weeks: ${request.studyTime.weeks}

Please provide a JSON response with the following structure for each subject, topic, and subtopic:
{
  "subject": "Subject Name",
  "topics": [
    {
      "topic": "Topic Name",
      "subtopics": [
        {
          "subTopic": "SubTopic Name (exactly as provided)",
          "searchTerm": "Best YouTube search term for this topic",
          "notes": "Generate detailed notes for the respective topic in depth with respect to the level of understanding required for that subject",
          "timeAlloted": "Recommended time to spend on this topic",
          "focusAreas": ["Key focus area 1", "Key focus area 2", "Key focus area 3"]
        }
      ]
    }
  ]
}

Make sure to:
1. Keep the exact same subject, topic, and subtopic names as provided
2. Generate relevant search terms for YouTube
3. Provide concise but informative notes
4. Suggest realistic time allocations based on the total study time provided
5. List 3-4 specific focus areas for each subtopic
6. Return ONLY the JSON array, no additional text or formatting`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert study planner. Return ONLY the JSON array, no additional text or markdown formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 2000
    });

    const response = chatCompletion.choices[0]?.message?.content || "";
    
    // Extract JSON from the response, handling potential markdown formatting
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in the response");
    }
    
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      throw new Error("Failed to parse the study plan response");
    }
  } catch (error) {
    console.error("Error generating study plan:", error);
    throw error;
  }
}