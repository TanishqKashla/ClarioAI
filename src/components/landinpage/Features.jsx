import React from "react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";


export function FeaturesSection() {
    const features = [
        {
            title: "AI-Generated Stepwise Notes",
            description:
                "Get clean, structured notes in seconds - no more messy, time-consuming note-taking.",
            skeleton: <SkeletonOne />,
            className:
                "col-span-1 lg:col-span-3 border-b lg:border-r dark:border-neutral-800",
        },
        {
            title: "Subject Creation & Syllabus Input",
            description:
                "Create subjects for each course or topic and paste your syllabus directly.",
            skeleton: <SkeletonTwo />,
            className: "border-b col-span-1 lg:col-span-3 dark:border-neutral-800",
        },
        {
            title: "Curated YouTube Video Recommendations",
            description:
                "Get the most relevant, high-quality video tutorials right next to your notes.",
            skeleton: <SkeletonThree />,
            className:
                "col-span-1 lg:col-span-4 lg:border-r  dark:border-neutral-800",
        },
        {
            title: "Centralized Learning Dashboard",
            description:
                "Access your syllabus, notes, and videos in one clean workspace - no more juggling tabs.",
            skeleton: < SkeletonFour />,
            className: "col-span-1 lg:col-span-2 border-b lg:border-none",
        },
    ];
    return (
        <div className="relative z-20 pt-16 pb-1 lg:py-40 mx-auto max-w-sm md:max-w-xl lg:max-w-5xl">
            <div className="px-8">
                <h4
                    className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white font-styrene">
                    Why Students Love ClarioAI
                </h4>

                <p
                    className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
                    A powerful AI-driven platform that transforms scattered, unorganized studying into a seamless, structured, and focused learning experience
                </p>
            </div>
            <div className="relative ">
                <div
                    className="grid grid-cols-1 lg:grid-cols-6 mt-8 xl:border rounded-md dark:border-neutral-800">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} className={feature.className}>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                            <div className=" h-full w-full">{feature.skeleton}</div>
                        </FeatureCard>
                    ))}
                </div>
            </div>
        </div>
    );
}

const FeatureCard = ({
    children,
    className
}) => {
    return (
        <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
            {children}
        </div>
    );
};

const FeatureTitle = ({
    children
}) => {
    return (
        <p
            className=" max-w-5xl mx-auto text-left tracking-tight text-[#a9d47f] text-xl md:text-2xl md:leading-snug font-styrene">
            {children}
        </p>
    );
};

const FeatureDescription = ({
    children
}) => {
    return (
        <p
            className={cn(
                "text-sm md:text-base  max-w-4xl text-left mx-auto",
                "text-neutral-500 text-center font-normal dark:text-neutral-300",
                "text-left max-w-sm mx-0 md:text-sm my-2"
            )}>
            {children}
        </p>
    );
};

export const SkeletonOne = () => {
    return (
        <div className="relative flex py-8 px-2 gap-10">
            <div
                className="w-full p-1 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
                <div className="">
                    <Image
                        src="/landingpage/features/stepwise.png"
                        alt="header"
                        width={400}
                        height={400}
                        className="h-full w-full aspect-square object-cover object-left-top rounded-2xl"
                    />

                </div>
            </div>
        </div>
    );
};

export const SkeletonThree = () => {
    return (
        <div className="w-full relative flex py-8 px-2 gap-10">
            <div
                className="p-1 mx-auto w-full bg-white dark:bg-neutral-900 shadow-2xl group">
                <div className="w-full">
                    <Image
                        src="/landingpage/features/youtube.png"
                        alt="header"
                        width={400}
                        height={400}
                        className="w-full object-cover object-left-top rounded-2xl"
                    />

                </div>
            </div>
        </div>
    );
};

export const SkeletonFour = () => {
    return (
        <div className="w-full relative flex py-8 px-2 gap-10">
            <div
                className="p-1 mx-auto w-full bg-white dark:bg-neutral-900 shadow-2xl group">
                <div className="w-full">
                    <Image
                        src="/landingpage/features/dashboard.png"
                        alt="header"
                        width={400}
                        height={400}
                        className="w-full object-cover object-left-top rounded-2xl"
                    />

                </div>
            </div>
        </div>
    );
};

export const SkeletonTwo = () => {

    return (
        <div className="relative flex py-8 px-2 gap-10">
            <div
                className="w-full p-1 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
                <div className="">
                    <Image
                        src="/landingpage/features/add-subject.png"
                        alt="header"
                        width={400}
                        height={400}
                        className="h-full w-full aspect-square object-cover object-left-top rounded-2xl"
                    />

                </div>
            </div>
        </div>
    );
};

