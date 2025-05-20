import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const body = await req.json();
        const { studyPlan } = body;

        const result = await prisma.studyPlan.create({
            data: {
                userId: session.user.id,
                studyPlan,
            },
        });

        return new Response(JSON.stringify({ success: true, id: result.id }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const studyPlans = await prisma.studyPlan.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return new Response(JSON.stringify(studyPlans), { status: 200 });
    } catch (error) {
        console.error("GET /api/studyplans error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const body = await req.json();
        const { planId, subjectId, topicId, subtopicId, isCompleted } = body;

        // Find the study plan
        const studyPlan = await prisma.studyPlan.findFirst({
            where: {
                id: planId,
                userId: session.user.id,
            },
        });

        if (!studyPlan) {
            return new Response(JSON.stringify({ error: "Study plan not found" }), { status: 404 });
        }

        // Update the completion status in the study plan
        const updatedStudyPlan = studyPlan.studyPlan.map(subject => {
            if (subject.subjectId === subjectId) {
                return {
                    ...subject,
                    topics: subject.topics.map(topic => {
                        if (topic.topicId === topicId) {
                            return {
                                ...topic,
                                subtopics: topic.subtopics.map(subtopic => {
                                    if (subtopic.subtopicId === subtopicId) {
                                        return { ...subtopic, isCompleted };
                                    }
                                    return subtopic;
                                })
                            };
                        }
                        return topic;
                    })
                };
            }
            return subject;
        });

        // Update the study plan in the database
        await prisma.studyPlan.update({
            where: { id: planId },
            data: { studyPlan: updatedStudyPlan }
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("PATCH /api/studyplans error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const planId = searchParams.get('planId');
        const subjectId = searchParams.get('subjectId');

        if (!planId || !subjectId) {
            return new Response(JSON.stringify({ error: "Missing planId or subjectId" }), { status: 400 });
        }

        // Find the study plan
        const studyPlan = await prisma.studyPlan.findFirst({
            where: {
                id: planId,
                userId: session.user.id,
            },
        });

        if (!studyPlan) {
            return new Response(JSON.stringify({ error: "Study plan not found" }), { status: 404 });
        }

        // Remove the subject from the study plan
        const updatedStudyPlan = studyPlan.studyPlan.filter(subject => subject.subjectId !== subjectId);

        // If this was the last subject, delete the entire study plan
        if (updatedStudyPlan.length === 0) {
            await prisma.studyPlan.delete({
                where: { id: planId }
            });
        } else {
            // Otherwise, update the study plan with the remaining subjects
            await prisma.studyPlan.update({
                where: { id: planId },
                data: { studyPlan: updatedStudyPlan }
            });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("DELETE /api/studyplans error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
