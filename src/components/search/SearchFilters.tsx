"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/utils/types";
import { Filter, Search } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  minPrice: string;
  maxPrice: string;
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export default function SearchFilters({
  searchQuery,
  selectedCategory,
  sortBy,
  minPrice,
  maxPrice,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onMinPriceChange,
  onMaxPriceChange,
}: SearchFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Filter className="w-5 h-5 mr-2" />
        <h2 className="text-lg font-semibold">Filtros</h2>
      </div>

      {/* Search */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Buscar</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Categoría</Label>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-2 block">
          Rango de Precio
        </Label>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <Label className="text-xs text-muted-foreground">Mínimo</Label>
            <Input
              type="number"
              placeholder="$0"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Máximo</Label>
            <Input
              type="number"
              placeholder="$1000"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Sort */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Ordenar por</Label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Orden por defecto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Orden por defecto</SelectItem>
            <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
            <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
            <SelectItem value="name">Nombre A-Z</SelectItem>
            <SelectItem value="newest">Más recientes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
