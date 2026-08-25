import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Loading skeleton component
const ComponentSkeleton = () => (
  <div className="min-h-screen bg-background p-6">
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="h-64" />
    </div>
  </div>
);

// HOC for consistent loading states
export const withLazyLoading = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <Suspense fallback={<ComponentSkeleton />}>
      <Component {...props} />
    </Suspense>
  );
};