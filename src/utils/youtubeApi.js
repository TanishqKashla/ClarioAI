// API key rotation for YouTube API
const API_KEYS = [
    process.env.NEXT_PUBLIC_YOUTUBE_API_KEY_1,
    process.env.NEXT_PUBLIC_YOUTUBE_API_KEY_2,
    process.env.NEXT_PUBLIC_YOUTUBE_API_KEY_3,
    process.env.NEXT_PUBLIC_YOUTUBE_API_KEY_4
].filter(Boolean); // Remove any undefined keys

let currentKeyIndex = 0;

// Simple in-memory dedupe + cache
const IN_FLIGHT_QUERIES = new Map(); // queryKey -> Promise<items>
const QUERY_CACHE = new Map(); // queryKey -> { items, timestamp }
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Function to get next API key in rotation
function getNextApiKey() {
    if (API_KEYS.length === 0) {
        throw new Error('No YouTube API keys configured');
    }
    
    const key = API_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    return key;
}

// Function to get current API key without rotating
function getCurrentApiKey() {
    if (API_KEYS.length === 0) {
        throw new Error('No YouTube API keys configured');
    }
    return API_KEYS[currentKeyIndex];
}

export async function searchYouTubeVideos(query) {
    const queryKey = (query || '').trim().toLowerCase();

    // Use in-flight promise to dedupe concurrent/duplicate requests (e.g., Strict Mode)
    if (IN_FLIGHT_QUERIES.has(queryKey)) {
        return IN_FLIGHT_QUERIES.get(queryKey);
    }

    // Short-lived cache to avoid back-to-back identical calls
    const cached = QUERY_CACHE.get(queryKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return cached.items;
    }

    const apiKey = getNextApiKey();

    const fetchPromise = (async () => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(
                    query
                )}&key=${apiKey}&type=video`
            );

            if (!response.ok) {
                // Log the response status and status text
                console.error(`YouTube API request failed: ${response.status} ${response.statusText}`);
                const errorBody = await response.text(); // Read the error response body
                console.error('Error response body:', errorBody);

                throw new Error(`YouTube API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const items = data.items || [];
            // Populate cache
            QUERY_CACHE.set(queryKey, { items, timestamp: Date.now() });
            return items;
        } catch (error) {
            console.error('Error searching YouTube:', error);
            throw error;
        } finally {
            IN_FLIGHT_QUERIES.delete(queryKey);
        }
    })();

    IN_FLIGHT_QUERIES.set(queryKey, fetchPromise);
    return fetchPromise;
}

// Export utility functions for debugging/monitoring
export { getCurrentApiKey, getNextApiKey };
