export async function searchYouTubeVideos(query) {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
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
        return data.items && data.items.length > 0 ? data.items[0] : null;
    } catch (error) {
        console.error('Error searching YouTube:', error);
        throw error;
    }
}
