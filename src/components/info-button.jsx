"use client"

import { useState } from "react"

export function InfoButton({ message }) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="relative inline-block">
            <button
                className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-600 transition-colors"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                i
            </button>

            {isVisible && (
                <div className="absolute bottom-full right-[15%] mb-2 px-3 py-2 bg-black text-white text-xs rounded max-w-[220px] min-w-[220px] text-center break-words shadow-lg z-50">
                    {message}
                </div>
            )}


        </div>
    )
}
