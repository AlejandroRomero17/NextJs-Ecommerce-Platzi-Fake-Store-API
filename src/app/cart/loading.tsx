// src/app/cart/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function CartLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-48 mb-6"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <Skeleton className="w-20 h-20 bg-muted rounded"></Skeleton>
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 bg-muted rounded w-3/4"></Skeleton>
                    <Skeleton className="h-4 bg-muted rounded w-1/2"></Skeleton>
                  </div>
                  <Skeleton className="w-20 h-8 bg-muted rounded"></Skeleton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
