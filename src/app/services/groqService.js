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
          "description": "Generate 2-3 lines description for the subtopic",
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
3. Provide concise but informative description for the subtopic
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

export async function generateSubtopicNotes(subject, topic, subtopic) {
  const prompt = `As a subject matter expert in ${subject}, specifically focusing on ${topic}, please generate comprehensive study notes about "${subtopic}".

Your notes should include:
1. Key concepts and definitions
2. Important principles or theories
3. Examples or applications where relevant
4. Common misconceptions or challenging aspects
5. Summary of main points

Format the notes in a clear, structured way that would be helpful for a student studying this topic.
`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert educator and subject matter specialist. Provide clear, accurate, and comprehensive notes on the requested topic."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 1500
    });

    return chatCompletion.choices[0]?.message?.content || "Unable to generate notes.";
  } catch (error) {
    console.error("Error generating subtopic notes:", error);
    throw error;
  }
}