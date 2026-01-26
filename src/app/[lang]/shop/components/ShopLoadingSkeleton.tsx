export function ShopLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background pt-32 md:pt-40 pb-12">
      <div className="container mx-auto px-4 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
