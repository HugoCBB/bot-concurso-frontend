import { ContestGridSkeleton } from "@/app/components/CardSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* header skeleton */}
        <div className="text-center mb-10 space-y-3 animate-pulse">
          <div className="h-9 w-56 bg-gray-200 rounded mx-auto" />
          <div className="h-4 w-80 bg-gray-200 rounded mx-auto" />
        </div>

        <ContestGridSkeleton />
      </div>
    </main>
  );
}
