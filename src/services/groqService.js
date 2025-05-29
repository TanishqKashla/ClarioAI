import Groq from "groq-sdk";

const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

const groq = new Groq({
  apiKey: apiKey,
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

Please provide a JSON response with the following structure for each subject, topic, and subtopic:
[
  {
    "subjectName": "Subject Name (add a relevant emoji at the beginning of the subject name, Capitalise the first letter of each word)",
    "subjectId": "" // (Initially leave this empty),
    "topics": [
      {
        "name": "Topic Name",
        "topicId": "", // (Initially leave this empty),
        "subtopics": [
          {
            "name": "Subtopic Name",
            "subtopicId": "", // (Initially leave this empty),
            "searchTerm": "A well-crafted YouTube search term to understand this subtopic (should feel natural to a student searching this for the first time)",
            "description": "2–3 lines of clear and informative description about the subtopic",
            "focusAreas": [
              "Key concept 1 to focus on",
              "Key concept 2",
              "Key concept 3"
            ],
            "recommendedVideos": [],          // (Initially leave this empty)
            "selectedVideoId": "",            // (Initially leave this empty)
            "aiNotes": ""                     // (Initially leave this empty)
            isCompleted: false
          }
        ]
      }
    ]
  }
]


Make sure to:
1. Keep the exact same subject, topic as provided
2. Generate relevant search terms for YouTube, pretend as if youre a student who is learning the topic for the first time and searching for a video on YouTube
3. Provide concise but informative description for the subtopic
5. List 3-4 specific focus areas for each subtopic, these should be the key areas that a student should focus on while studying the subtopic. number of focus areas may vary according to the topic, but it should be relevant to the subtopic.
6. Return ONLY the JSON array, no additional text or formatting
7. Make sure you only return one JSON array for the subject name`;

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
      temperature: 0.5
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
  const prompt = `As a subject matter expert in "${subject}", specifically focusing on the topic "${topic}", your task is to generate clear, structured, and insightful educational content about the subtopic: "${subtopic}".

🧠 Very Important: "${subtopic}" must be explained strictly within the context of "${topic}" under the umbrella of "${subject}". Do not generalize the subtopic or drift into other disciplines or applications unless explicitly instructed. Always prioritize relevance to the specified topic and subject.

Please include:

1. 🎯 **Introduction**  
   - Define the subtopic clearly in context.  
   - Why is it important or useful within "${topic}"?

2. 📚 **Key Concepts & Terminology**  
   - Explain important concepts, features, or terms.  
   - Use section-wise breakdowns with clear subheadings.

3. 💻 **Code/Examples (if applicable)**  
   - Provide language-specific, context-relevant examples.  
   - Show proper usage and best practices.

4. 🌍 **Use Cases / Applications**  
   - Describe how it applies in real-world scenarios — but still tied to the current domain.

5. ⚠️ **Common Pitfalls / Misconceptions**  
   - Mention things people often get wrong in this subtopic.

6. 📌 **Summary Checklist / Table**  
   - Create a compact reference guide at the end.

🗣️ **Tone & Style**  
- Friendly, not overly academic  
- Structured and beginner-friendly, but useful for professionals too  
- Use bullets, icons (📌🛠️✅), and tables sparingly to aid readability

🎯 **Assume your audience is a curious learner — not necessarily a student or expert.**
`



  // Feel free to structure this content in the way you believe will be most effective for deep learning. You should include any relevant elements such as:

  // - Core concepts, principles, and theoretical frameworks
  // - Mathematical formulas, equations, and notations only where applicable
  // - Chemical reactions, biological processes, or physical laws with proper notation only where applicable
  // - Algorithms, code snippets, or pseudocode for technical concepts only where applicable
  // - Historical context and development of ideas only where applicable
  // - Practical applications and real-world examples
  // - Advanced insights that go beyond basic understanding
  // - Visual descriptions or conceptual models when helpful
  // - Connections to related fields or interdisciplinary perspectives
  // - Thought-provoking questions that encourage critical thinking

  // For technical subjects in mathematics, physics, chemistry, engineering, computer science, or similar fields, be sure to include all relevant formulas, equations, and technical notations properly formatted.
  // Provide Algorithms, code snippets, or pseudocode ONLY for technical subjects.
  // Don't feel constrained by conventional formats - organize the information in whatever way best represents the knowledge architecture of this topic. Your goal is to create content that would genuinely help someone develop expertise in this area.`;

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
      temperature: 0.5,
      max_tokens: 6000
    });

    return chatCompletion.choices[0]?.message?.content || "Unable to generate notes.";
  } catch (error) {
    console.error("Error generating subtopic notes:", error);
    throw error;
  }
}