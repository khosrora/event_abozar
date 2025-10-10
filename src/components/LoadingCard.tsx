export default function LoadingCard() {
  return (
    <div className="card bg-base-100 shadow-md rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-base-300"></div>
      <div className="card-body p-5">
        <div className="h-4 bg-base-300 rounded mb-2"></div>
        <div className="h-4 bg-base-300 rounded w-2/3 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-base-300 rounded w-16"></div>
          <div className="h-8 bg-base-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}

export function LoadingCardGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}

export function LoadingCardSlider({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-4 md:gap-5 overflow-x-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="shrink-0 w-64 sm:w-72 md:w-80">
          <LoadingCard />
        </div>
      ))}
    </div>
  );
}