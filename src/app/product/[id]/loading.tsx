// src/app/product/[id]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Back Button Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-20 h-20 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-6 w-24 mb-3" />
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="h-px bg-border" />

          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-20 w-full" />
          </div>

          <div className="h-px bg-border" />

          {/* Quantity and Add to Cart Skeleton */}
          <div className="space-y-4">
            <div>
              <Skeleton className="h-5 w-24 mb-2" />
              <div className="flex items-center space-x-3">
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-9 w-9" />
              </div>
            </div>

            <div className="flex space-x-3">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-12" />
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Product Details Skeleton */}
          <div className="space-y-2 text-sm">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div>
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-6 w-20" />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
