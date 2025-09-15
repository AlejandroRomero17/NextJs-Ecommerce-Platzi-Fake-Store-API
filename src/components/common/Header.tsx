"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  LogOut,
  UserCircle,
  Home,
  ShoppingBag,
} from "lucide-react";

export function Header() {
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
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const cartItemsCount = getTotalItems();

  if (authLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-slate-700 rounded-lg animate-pulse" />
              <div className="w-24 h-6 bg-slate-700 rounded animate-pulse" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-slate-700 rounded-full animate-pulse" />
              <div className="w-8 h-8 bg-slate-700 rounded animate-pulse" />
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
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="font-bold text-xl text-white">StoreApp</span>
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

          {/* Mobile menu button with Sheet */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Cart button for mobile */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 hover:text-green-300 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-500 hover:bg-green-600 border-2 border-slate-900">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Sheet trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-slate-900 border-l border-slate-700/30"
              >
                <SheetHeader className="border-b border-slate-700/30 pb-4">
                  <SheetTitle className="text-white flex items-center">
                    <UserCircle className="w-5 h-5 mr-2 text-blue-400" />
                    {isAuthenticated ? `Hola, ${user?.name}` : "Menú"}
                  </SheetTitle>
                </SheetHeader>

                <div className="py-6 space-y-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="px-1">
                    <div className="relative">
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

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <SheetTrigger asChild>
                      <Link
                        href="/"
                        className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <Home className="w-5 h-5 mr-3" />
                        Inicio
                      </Link>
                    </SheetTrigger>

                    <SheetTrigger asChild>
                      <Link
                        href="/search"
                        className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <ShoppingBag className="w-5 h-5 mr-3" />
                        Productos
                      </Link>
                    </SheetTrigger>
                  </div>

                  {/* User Section */}
                  <div className="border-t border-slate-700/30 pt-4 space-y-3">
                    {isAuthenticated ? (
                      <>
                        <SheetTrigger asChild>
                          <Link
                            href="/profile"
                            className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <User className="w-5 h-5 mr-3" />
                            Mi Perfil
                          </Link>
                        </SheetTrigger>

                        <Button
                          variant="ghost"
                          className="w-full justify-start px-4 py-3 text-white/90 hover:text-red-300 hover:bg-red-500/20"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-5 h-5 mr-3" />
                          Cerrar sesión
                        </Button>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <SheetTrigger asChild>
                          <Link
                            href="/auth/login"
                            className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <User className="w-5 h-5 mr-3" />
                            Iniciar sesión
                          </Link>
                        </SheetTrigger>

                        <SheetTrigger asChild>
                          <Link
                            href="/auth/register"
                            className="flex items-center px-4 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors justify-center font-medium"
                          >
                            Crear cuenta
                          </Link>
                        </SheetTrigger>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
