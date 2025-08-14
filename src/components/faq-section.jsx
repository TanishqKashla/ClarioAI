"use client";
import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

const faqData = [
  {
    id: "1",
    question: "Can I need to upload my entire syllabus?",
    answer:
      "You can paste your syllabus topics or even just a few keywords. ClarioAI will still generate structured notes and find relevant videos for you.",
  },
  {
    id: "2",
    question: "Is ClarioAI free to use?",
    answer:
      "We offer a free version to get you started, with premium features for advanced organization, unlimited subjects, and enhanced AI capabilities.",
  },
  {
    id: "3",
    question: "Is ClarioAI only for school or college students?",
    answer:
      "No, while it’s perfect for students, anyone who wants to learn a topic (coding, languages, hobbies) can use ClarioAI for structured, resource-rich learning.",
  },
  {
    id: "4",
    question: "How accurate are the AI-generated notes?",
    answer:
      "Our AI processes your topics to create concise, high-quality notes and pairs them with the most relevant learning videos. You can edit or expand them anytime.",
  },
  {
    id: "5",
    question: "How fast can I get started?",
    answer:
      "Sign-up takes less than a minute. You’ll have your personalized workspace ready before you finish your coffee.",
  },
  
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState(new Set())

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className="space-y-4 lg:max-w-5xl mx-auto">
      <h2 className="font-bold text-4xl text-center text-white font-styrene mb-10">
        Frequently Asked Questions
      </h2>
      {faqData.map((item) => {
        const isOpen = openItems.has(item.id)

        return (
          <div
            key={item.id}
            className="border border-border rounded-lg bg-card overflow-hidden transition-all duration-200 hover:shadow-md">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}>
              <h3 className="text-lg font-styrene text-[#a9d47f] pr-4">{item.question}</h3>
              <div className="flex-shrink-0">
                {isOpen ? (
                  <Minus
                    className="h-5 w-5 text-[#a9d47f] transition-transform duration-200" />
                ) : (
                  <Plus
                    className="h-5 w-5 text-[#a9d47f] transition-transform duration-200" />
                )}
              </div>
            </button>
            <div
              id={`faq-answer-${item.id}`}
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}>
              <div className="px-6 pb-4 pt-0">
                <div className="border-t border-border pt-4">
                  <p className="text-white leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
