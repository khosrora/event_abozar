"use client";

interface ItemGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  isLoading?: boolean;
}

function GridSkeleton({ cols = 3 }: { cols: number }) {
  return (
    <div className={`grid gap-4 md:gap-6 ${
      cols === 1 ? 'grid-cols-1' :
      cols === 2 ? 'grid-cols-1 md:grid-cols-2' :
      cols === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    }`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card bg-base-200 animate-pulse">
          <div className="h-40 w-full bg-base-300 md:h-48" />
          <div className="card-body">
            <div className="h-4 bg-base-300 rounded mb-2" />
            <div className="h-3 bg-base-300 rounded w-3/4 mb-2" />
            <div className="h-3 bg-base-300 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ItemGrid({ children, cols = 3, isLoading = false }: ItemGridProps) {
  if (isLoading) {
    return <GridSkeleton cols={cols} />;
  }

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className={`grid gap-4 md:gap-6 ${gridClasses[cols]}`}>
      {children}
    </div>
  );
}