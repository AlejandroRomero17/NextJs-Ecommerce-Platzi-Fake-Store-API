"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User as UserType } from "@/utils/types";
import { LogOut, User } from "lucide-react";

interface ProfileCardProps {
  user: UserType;
  onLogout: () => void;
}

export default function ProfileCard({ user, onLogout }: ProfileCardProps) {
  return (
    <div className="text-center p-6 border rounded-lg">
      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
        <User className="w-12 h-12 text-primary-foreground" />
      </div>
      <h2 className="text-xl font-bold text-foreground mb-2">{user.name}</h2>
      <Badge variant="secondary" className="mb-4">
        {user.role}
      </Badge>
      <Button
        onClick={onLogout}
        variant="outline"
        className="w-full bg-transparent"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Cerrar Sesión
      </Button>
    </div>
  );
}
