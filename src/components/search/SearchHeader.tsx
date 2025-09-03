"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";

interface SearchHeaderProps {
  searchQuery: string;
  totalProducts: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function SearchHeader({
  searchQuery,
  totalProducts,
  hasActiveFilters,
  onClearFilters,
}: SearchHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <Link href="/">
          <Button variant="ghost" className="-ml-4 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a la tienda
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">
          {searchQuery
            ? `Resultados para "${searchQuery}"`
            : "Buscar Productos"}
        </h1>
        <p className="text-muted-foreground">
          {totalProducts}{" "}
          {totalProducts === 1
            ? "producto encontrado"
            : "productos encontrados"}
        </p>
      </div>
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="bg-transparent"
        >
          <X className="w-4 h-4 mr-2" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}
