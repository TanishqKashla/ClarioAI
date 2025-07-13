import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUserUsage } from "@/lib/rateLimit";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const usage = await getUserUsage(session.user.id);

        return new Response(JSON.stringify({ 
            success: true, 
            usage 
        }), { status: 200 });
    } catch (error) {
        console.error("Error getting user usage:", error);
        return new Response(JSON.stringify({ error: "Failed to get usage" }), { status: 500 });
    }
} 