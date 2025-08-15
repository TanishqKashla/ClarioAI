export default function SubjectSkeleton() {
    return (
        <div className="w-full p-4 animate-pulse">
            {/* Subject title */}
            <div className="h-8 w-1/3 bg-sidebar rounded-lg mb-6"></div>

            {/* Simulated topic cards */}
            <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="h-16 w-full bg-sidebar rounded-lg"
                    ></div>
                ))}
            </div>
        </div>
    );
}
