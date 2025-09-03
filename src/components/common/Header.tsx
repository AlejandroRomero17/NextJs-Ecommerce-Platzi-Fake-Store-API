// components/common/Header.tsx - Versión mejorada
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  LogOut,
  UserCircle,
  Package,
} from "lucide-react";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, isAuthenticated, logout, isLoading: authLoading } = useAuth();
  const { getTotalItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.push("/");
  };

  const cartItemsCount = getTotalItems();

  // Si está cargando, mostrar un skeleton
  if (authLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Skeleton loader para header */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-slate-700 rounded-lg animate-pulse"></div>
              <div className="w-24 h-6 bg-slate-700 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-slate-700 rounded-full animate-pulse"></div>
              <div className="w-8 h-8 bg-slate-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-700/30 shadow-xl"
          : "bg-slate-900/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">TiendaApp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white/90 hover:text-white transition-colors font-medium hover:scale-105 transition-transform"
            >
              Inicio
            </Link>
            <Link
              href="/search"
              className="text-white/90 hover:text-white transition-colors font-medium hover:scale-105 transition-transform"
            >
              Productos
            </Link>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-white/20 focus:bg-white/15"
              />
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white/5 rounded-full px-3 py-1">
                  <UserCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-white/80">
                    Hola, {user?.name}
                  </span>
                </div>

                <Link href="/profile">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 hover:text-blue-300"
                  >
                    Perfil
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white hover:bg-red-500/20 hover:text-red-300"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Salir
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 hover:text-blue-300"
                  >
                    <User className="w-4 h-4 mr-1" />
                    Ingresar
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button
                    size="sm"
                    className="bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-blue-500/25"
                  >
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}

            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 hover:text-green-300 relative group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-500 hover:bg-green-600 border-2 border-slate-900">
                    {cartItemsCount > 99 ? "99+" : cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 bg-slate-900/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2 px-4"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-white/20"
                  />
                </div>
              </form>

              {/* Mobile Links */}
              <Link
                href="/"
                className="text-white/90 hover:text-white transition-colors py-2 px-4 font-medium hover:bg-white/5 rounded mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/search"
                className="text-white/90 hover:text-white transition-colors py-2 px-4 font-medium hover:bg-white/5 rounded mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>

              {/* Separator */}
              <div className="border-t border-white/20 mx-4"></div>

              {/* Mobile User Actions */}
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 px-4">
                  <div className="flex items-center space-x-2 px-2 py-1">
                    <UserCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-white/80">
                      Hola, {user?.name}
                    </span>
                  </div>

                  <Link
                    href="/profile"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start w-full text-white hover:bg-white/10 hover:text-blue-300"
                    >
                      Mi Perfil
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="justify-start text-white hover:bg-red-500/20 hover:text-red-300"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <Link
                    href="/auth/login"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start w-full text-white hover:bg-white/10 hover:text-blue-300"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Iniciar sesión
                    </Button>
                  </Link>
                  <Link
                    href="/auth/register"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      size="sm"
                      className="w-full bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Crear cuenta
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Cart */}
              <Link
                href="/cart"
                className="px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start w-full text-white hover:bg-white/10 hover:text-green-300 relative"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Carrito
                  {cartItemsCount > 0 && (
                    <Badge className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-500 hover:bg-green-600">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
