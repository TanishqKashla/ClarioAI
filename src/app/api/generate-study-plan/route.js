import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { checkRateLimit } from "@/lib/rateLimit";
import { generateStudyPlan } from "@/services/groqService";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const body = await req.json();
        const { studyPlan } = body;

        if (!studyPlan || !Array.isArray(studyPlan)) {
            return new Response(JSON.stringify({ error: "Invalid study plan data" }), { status: 400 });
        }

        // Check rate limit for study plan generation
        const rateLimitResult = await checkRateLimit(session.user.id, 'study-plan', 3);
        
        if (!rateLimitResult.allowed) {
            return new Response(JSON.stringify({ 
                error: "Rate limit exceeded",
                message: "You've reached your daily limit of 3 study plans. Please try again tomorrow.",
                currentUsage: rateLimitResult.currentCount,
                limit: rateLimitResult.limit,
                resetAt: rateLimitResult.resetAt
            }), { status: 429 });
        }

        // Generate the study plan using Groq
        const generatedPlan = await generateStudyPlan({
            subjects: studyPlan
        });

        return new Response(JSON.stringify({ 
            success: true, 
            studyPlan: generatedPlan,
            rateLimit: {
                currentUsage: rateLimitResult.currentCount,
                limit: rateLimitResult.limit,
                resetAt: rateLimitResult.resetAt
            }
        }), { status: 200 });
    } catch (error) {
        console.error("Error generating study plan:", error);
        return new Response(JSON.stringify({ error: "Failed to generate study plan" }), { status: 500 });
    }
} 