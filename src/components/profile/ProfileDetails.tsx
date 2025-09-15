"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User as UserType } from "@/types";
import { Calendar, Mail, ShoppingBag, User } from "lucide-react";

interface ProfileDetailsProps {
  user: UserType;
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="w-5 h-5 mr-2" />
          Información del Perfil
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Email</span>
          </div>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">ID de Usuario</span>
          </div>
          <span className="text-sm text-muted-foreground">#{user.id}</span>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Miembro desde</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(user.creationAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Rol</span>
          </div>
          <Badge variant="outline">{user.role}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
