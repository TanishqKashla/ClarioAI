export default function AppSkeleton() {
    return (
        <div className="min-h-screen p-6 animate-pulse">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Welcome header skeleton */}
                <div>
                    <div className="h-8 w-1/3 bg-sidebar rounded-lg mb-2"></div>
                    <div className="h-4 w-1/2 bg-sidebar rounded-lg"></div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Quick Actions skeleton */}
                    <div className="space-y-3">
                        <div className="h-5 w-1/3 bg-sidebar rounded-lg mb-4"></div>
                        <div className="h-10 w-full bg-sidebar rounded-lg"></div>
                        <div className="h-10 w-full bg-sidebar rounded-lg"></div>
                    </div>

                    {/* UsageDisplay skeleton */}
                    <div className="h-40 bg-sidebar rounded-lg"></div>
                </div>

                {/* Recent Study Plans skeleton */}
                <div>
                    <div className="h-5 w-1/4 bg-sidebar rounded-lg mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-16 w-full bg-sidebar rounded-lg"></div>
                        <div className="h-16 w-full bg-sidebar rounded-lg"></div>
                        <div className="h-16 w-full bg-sidebar rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
