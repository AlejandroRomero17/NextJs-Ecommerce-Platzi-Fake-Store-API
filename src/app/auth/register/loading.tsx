export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-6 -ml-4">
          <div className="w-24 h-10 bg-muted rounded-md animate-pulse"></div>
        </div>

        <div className="shadow-lg rounded-lg border bg-card">
          <div className="p-6 text-center space-y-4 border-b">
            <div className="w-12 h-12 bg-muted rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-8 bg-muted rounded-md w-3/4 mx-auto animate-pulse"></div>
            <div className="h-4 bg-muted rounded-md w-2/3 mx-auto animate-pulse"></div>
          </div>

          <div className="p-6 space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded-md w-1/4 animate-pulse"></div>
                <div className="h-10 bg-muted rounded-md animate-pulse"></div>
              </div>
            ))}
            <div className="h-10 bg-muted rounded-md mt-4 animate-pulse"></div>
          </div>

          <div className="p-6 border-t space-y-4">
            <div className="h-px bg-muted w-full"></div>
            <div className="h-4 bg-muted rounded-md w-2/3 mx-auto animate-pulse"></div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="h-3 bg-muted rounded-md w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
