export default function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden animate-pulse">
      <div className="h-1 w-full bg-gray-200" />
      <div className="p-5 flex flex-col gap-4">
        <div className="h-5 w-20 bg-gray-200 rounded-full" />
        <div className="space-y-2">
          <div className="h-4 w-4/5 bg-gray-200 rounded" />
          <div className="h-4 w-3/5 bg-gray-200 rounded" />
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <div className="w-4 h-4 bg-gray-200 rounded mt-0.5 shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="h-3 w-12 bg-gray-200 rounded" />
                <div className="h-3 w-3/4 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <div className="h-3 w-28 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="px-5 pb-5">
        <div className="h-10 w-full bg-gray-200 rounded-xl" />
      </div>
    </div>
  )
}

export function ContestGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
