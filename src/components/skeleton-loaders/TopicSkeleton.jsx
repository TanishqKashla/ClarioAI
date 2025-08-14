export default function TopicSkeleton() {
    return (
        <div className="min-h-screen bg-background p-3 animate-pulse">
            {/* Subject Name */}
            <div className="h-5 w-1/4 bg-sidebar rounded-lg mb-2"></div>

            {/* Topic Name */}
            <div className="h-8 w-1/2 bg-sidebar rounded-lg mb-6"></div>

            {/* Progress Bar */}
            <div className="w-full bg-sidebar h-2 rounded-full mb-3"></div>
            <div className="h-4 w-20 bg-sidebar rounded-lg mb-6"></div>

            {/* Subtopic Cards */}
            <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="h-16 w-full bg-sidebar rounded-lg"
                    ></div>
                ))}
            </div>
        </div>
    );
}
