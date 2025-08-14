import { BrainCircuit, FolderOpen, Zap } from 'lucide-react'
import React from 'react'

const ValueProposition = () => {
    const data = [
        {
            title: "Everything in One Place",
            description: "No more switching between docs, notes, and YouTube, ClarioAI puts all your study tools in one clean, distraction-free workspace.",
            icon: <FolderOpen />
        },
        {
            title: "Instant Structure, Zero Guesswork",
            description: "Paste your syllabus and let ClarioAI break it into a clear, step-by-step learning plan that makes sense from start to finish.",
            icon: <Zap />
        },
        {
            title: "Learn Smarter, Not Harder",
            description: "Every topic comes with precise AI-generated notes and the most relevant YouTube videos, so you focus on learning, not searching.",
            icon: <BrainCircuit />
        }
    ]

    return (
        <section className='w-full'>
            <div className='flex flex-col md:flex-row gap-4 max-w-6xl mx-auto'>
                {data.map((item, index) => (
                    <div key={index} className='border overflow-hidden rounded-2xl relative'>
                        <div className='bg-[#a9d47fe6] h-20 rounded-full aspect-square absolute right-0 bottom-0'/>
                        <div className='flex flex-col justify-between p-6 backdrop-blur-3xl  h-full w-full'>
                            <div className='p-2 border w-fit rounded-lg mb-10'>{item.icon}</div>
                            <div>
                                <h3 className='text-xl font-styrene text-[#a9d47f] font-semibold mb-4'>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )

}

export default ValueProposition