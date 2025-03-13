export async function searchYouTubeVideos(query) {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
                query
            )}&key=${apiKey}&type=video`
        );

        if (!response.ok) {
            throw new Error('YouTube API request failed');
        }

        const data = await response.json();
        return data.items && data.items.length > 0 ? data.items[0] : null;
    } catch (error) {
        console.error('Error searching YouTube:', error);
        throw error;
    }
}