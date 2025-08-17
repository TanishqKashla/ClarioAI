"use client"
import React from 'react'
import { Github, Twitter, Linkedin } from 'lucide-react'

export const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full border-t border-neutral-800 bg-black text-neutral-400">
            <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div>
                        <div className="text-xl font-semibold text-white font-styrene">ClarioAI</div>
                        <p className="mt-3 max-w-sm text-sm text-neutral-400 ">
                            From scattered to streamlined - your learning, organized.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-300">Additional Links</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a className="hover:text-white" href="/about">About Us</a></li>
                            <li><a className="hover:text-white" href="/features">Features</a></li>
                            <li><a className="hover:text-white" href="/contact">Contact Us</a></li>
                            <li><a className="hover:text-white" href="/pricing">Pricing</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-neutral-800 pt-6 md:flex-row md:items-center">
                    <p className="text-xs text-neutral-500">© {currentYear} ClarioAI, Inc. All rights reserved.</p>
                    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
                        <nav className="flex gap-4 text-xs">
                            <a className="hover:text-white" href="/privacy-policy">Privacy</a>
                            <a className="hover:text-white" href="/terms">Terms</a>
                        </nav>
                        <div className="flex items-center gap-3">
                            <a aria-label="GitHub" className="rounded p-1 hover:text-white" href="https://github.com/" target="_blank" rel="noreferrer noopener">
                                <Github size={18} />
                            </a>
                            <a aria-label="Twitter" className="rounded p-1 hover:text-white" href="https://x.com/" target="_blank" rel="noreferrer noopener">
                                <Twitter size={18} />
                            </a>
                            <a aria-label="LinkedIn" className="rounded p-1 hover:text-white" href="https://www.linkedin.com/" target="_blank" rel="noreferrer noopener">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}


