'use client'
import React from 'react'
import { motion } from "motion/react";
import { BackgroundBeams } from '@/components/ui/background-beams';
import { SquareArrowOutUpRight } from 'lucide-react';
import { FeaturesSection } from '@/components/landinpage/Features';
import ValueProposition from '@/components/landinpage/ValueProposition';

const page = () => {
    return (
        <div className="relative mx-auto flex flex-col items-center justify-center mb-20">
            <div className="px-4 py-10 h-[70vh] md:py-20 flex flex-col justify-center items-center">
                <h1 className="relative z-10 text-center md:max-w-2xl lg:max-w-5xl max-w-lg text-4xl  font-bold text-slate-700 md:text-5xl lg:text-7xl dark:text-slate-300 font-styrene">
                    {"From Scattered to Streamlined in Seconds"
                        .split(" ")
                        .map((word, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                    ease: "easeInOut",
                                }}
                                className="mr-2 inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}
                </h1>
                <motion.p
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 0.8,
                    }}
                    className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
                >
                    ClarioAI creates clean, organized notes and finds top videos, so you focus on learning, not searching.
                </motion.p>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 1,
                    }}
                    className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
                >
                    <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                        <a href="https://clarioai.vercel.app/app" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                            Get Started<SquareArrowOutUpRight size={15} />
                        </a>
                    </button>
                    <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
                        About Us
                    </button>
                </motion.div>
                <BackgroundBeams />
            </div>
            <div className='w-full bg-background p-3'>
                <ValueProposition />
                <FeaturesSection />
            </div>

        </div>
    )
}

export default page