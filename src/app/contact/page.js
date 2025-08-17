'use client'
import React from 'react'
import { motion } from "motion/react"
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-8">
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                {/* Coming Soon Content */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-700 dark:text-slate-300 font-styrene mb-6">
                        Contact Us
                    </h1>
                    
                    <div className="bg-card border-[#a9d47f] text-card-foreground rounded-2xl p-8 md:p-12 shadow-xl">
                        <div className="text-6xl mb-6">📧</div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
                            Coming Soon
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            We're setting up multiple ways for you to get in touch with our team. Whether you have questions, 
                            feedback, or need support, we'll have the perfect communication channels ready for you soon.
                        </p>
                        
                        <div className="mt-8">
                            <Link 
                                href="/" 
                                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            >
                                Return to Home
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ContactPage
