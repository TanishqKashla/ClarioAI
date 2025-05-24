export async function searchYouTubeVideos(query) {
    try {
        // Get the session to access the user's token
        const response = await fetch('/api/auth/session');
        const session = await response.json();
        
        if (!session?.accessToken) {
            throw new Error('No access token available');
        }

        const searchResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(
                query
            )}&type=video`,
            {
                headers: {
                    'Authorization': `Bearer ${session.accessToken}`
                }
            }
        );

        if (!searchResponse.ok) {
            // Log the response status and status text
            console.error(`YouTube API request failed: ${searchResponse.status} ${searchResponse.statusText}`);
            const errorBody = await searchResponse.text(); // Read the error response body
            console.error('Error response body:', errorBody);

            throw new Error(`YouTube API request failed: ${searchResponse.status} ${searchResponse.statusText}`);
        }

        const data = await searchResponse.json();
        return data.items || [];
    } catch (error) {
        console.error('Error searching YouTube:', error);
        throw error;
    }
}
