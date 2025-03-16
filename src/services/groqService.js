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
          "subTopic": "SubTopic Name : (one liner explanation for that subtopic name, keep it short)",
          "searchTerm": "best youtube search term for this topic which will help students who are learning the topic for the first time to understand the topic better without having any knowledge about that topic (do not literraly convey this in the search term), search term should be in context with the subject and subtopics, it may include what, why, how terms to accurately search an informative video on the youtube search term",
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
      temperature: 0.7
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
  const prompt = `As a subject matter expert in ${subject}, specifically focusing on ${topic}, create comprehensive and insightful educational content about "${subtopic}".

Feel free to structure this content in the way you believe will be most effective for deep learning. You should include any relevant elements such as:

- Core concepts, principles, and theoretical frameworks
- Mathematical formulas, equations, and notations where applicable
- Chemical reactions, biological processes, or physical laws with proper notation
- Algorithms, code snippets, or pseudocode for computing concepts
- Historical context and development of ideas
- Practical applications and real-world examples
- Advanced insights that go beyond basic understanding
- Visual descriptions or conceptual models when helpful
- Connections to related fields or interdisciplinary perspectives
- Thought-provoking questions that encourage critical thinking

For technical subjects in mathematics, physics, chemistry, engineering, computer science, or similar fields, be sure to include all relevant formulas, equations, and technical notations properly formatted.

Don't feel constrained by conventional formats - organize the information in whatever way best represents the knowledge architecture of this topic. Your goal is to create content that would genuinely help someone develop expertise in this area.`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a world-class expert and educator with deep knowledge across multiple domains including highly technical subjects. You create rich, nuanced educational content that reflects sophisticated understanding and pedagogical excellence. Your explanations are authoritative, technically precise, and include all relevant formulas, equations, and specialized notations when appropriate to the subject matter."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 6000
    });

    return chatCompletion.choices[0]?.message?.content || "Unable to generate notes.";
  } catch (error) {
    console.error("Error generating subtopic notes:", error);
    throw error;
  }
}