import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { checkRateLimit } from "@/lib/rateLimit";
import { generateSubtopicNotes } from "@/services/groqService";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const body = await req.json();
        const { subject, topic, subtopic } = body;

        if (!subject || !topic || !subtopic) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        // Check rate limit for AI notes generation
        const rateLimitResult = await checkRateLimit(session.user.id, 'ai-notes', 10);
        
        if (!rateLimitResult.allowed) {
            return new Response(JSON.stringify({ 
                error: "Rate limit exceeded",
                message: "You've reached your daily limit of 10 AI notes. Please try again tomorrow.",
                currentUsage: rateLimitResult.currentCount,
                limit: rateLimitResult.limit,
                resetAt: rateLimitResult.resetAt
            }), { status: 429 });
        }

        // Generate the AI notes
        const notes = await generateSubtopicNotes(subject, topic, subtopic);

        return new Response(JSON.stringify({ 
            success: true, 
            notes,
            rateLimit: {
                currentUsage: rateLimitResult.currentCount,
                limit: rateLimitResult.limit,
                resetAt: rateLimitResult.resetAt
            }
        }), { status: 200 });
    } catch (error) {
        console.error("Error generating AI notes:", error);
        return new Response(JSON.stringify({ error: "Failed to generate notes" }), { status: 500 });
    }
} 