"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import AuthGuard from "@/components/common/AuthGuard";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileDetails from "@/components/profile/ProfileDetails";
import QuickActions from "@/components/profile/QuickActions";

function ProfileContent() {
  const router = useRouter();
  const { logout } = useAuth();
  const { data: user, isLoading, error } = useProfile();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Error al cargar el perfil
          </h1>
          <Link href="/auth/login">
            <Button>Iniciar sesión</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link href="/">
        <Button variant="ghost" className="mb-6 -ml-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a la tienda
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <ProfileCard user={user} onLogout={handleLogout} />
        </div>

        {/* Profile Details */}
        <div className="md:col-span-2">
          <ProfileDetails user={user} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <QuickActions />
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="p-6 border rounded-lg text-center">
            <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
            <Skeleton className="h-6 w-32 mx-auto mb-2" />
            <Skeleton className="h-4 w-24 mx-auto" />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="space-y-4 p-6 border rounded-lg">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard requireAuth={true}>
      <ProfileContent />
    </AuthGuard>
  );
}
