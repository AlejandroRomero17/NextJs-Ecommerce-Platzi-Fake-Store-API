"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, RefreshCw, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Search className="h-6 w-6 text-destructive" />
            <CardTitle className="text-2xl">Search Error</CardTitle>
          </div>
          <CardDescription>
            We encountered a problem with your search. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Search Failed</AlertTitle>
            <AlertDescription>
              {error.message || "Unable to complete your search request"}
            </AlertDescription>
          </Alert>

          <div className="flex gap-2">
            <Button onClick={() => reset()} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry Search
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="flex-1"
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
