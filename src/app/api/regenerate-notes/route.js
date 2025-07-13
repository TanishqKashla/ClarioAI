import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { checkRateLimit } from "@/lib/rateLimit";
import { regenerateSubtopicNotes } from "@/services/groqService";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const body = await req.json();
        const { subject, topic, subtopic, userFeedback, previousNotes } = body;

        if (!subject || !topic || !subtopic || !userFeedback || !previousNotes) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        // Check rate limit for note regeneration (1 per day)
        const rateLimitResult = await checkRateLimit(session.user.id, 'regenerate-notes', 1);
        
        if (!rateLimitResult.allowed) {
            return new Response(JSON.stringify({ 
                error: "Rate limit exceeded",
                message: "You've reached your daily limit of 1 note regeneration. Please try again tomorrow.",
                currentUsage: rateLimitResult.currentCount,
                limit: rateLimitResult.limit,
                resetAt: rateLimitResult.resetAt
            }), { status: 429 });
        }

        // Regenerate the AI notes
        const notes = await regenerateSubtopicNotes(subject, topic, subtopic, userFeedback, previousNotes);

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
        console.error("Error regenerating AI notes:", error);
        return new Response(JSON.stringify({ error: "Failed to regenerate notes" }), { status: 500 });
    }
} 