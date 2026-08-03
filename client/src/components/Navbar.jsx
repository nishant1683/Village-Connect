import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, LogOut, User, ClipboardList } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "@/store/shop/cart-slice";
import logoImg from "@/assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const { cartItems } = useSelector((state) => state.shopCart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    logoutUser();
    navigate("/auth/login");
  };

  const navLinks = [
    { name: "Home", path: "/shop/home" },
    { name: "Products", path: "/shop/listing" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-emerald-800/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/shop/home" className="flex items-center gap-2">
              <img src={logoImg} alt="Village-Connect" className="h-10 w-auto object-contain" />
              <span className="font-bold text-emerald-900 text-lg">Village-Connect</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-semibold text-emerald-900/80 hover:text-emerald-950 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon (only for users) */}
            {user && (
              <Link to="/cart" className="relative p-2 text-emerald-900 hover:text-emerald-950 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cartItems?.items?.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">
                    {cartItems.items.length}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Avatar className="h-9 w-9 border border-emerald-900/10 bg-emerald-800">
                    <AvatarFallback className="bg-emerald-800 text-white font-bold">
                      {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel className="font-semibold text-emerald-900">
                    Logged in as {user.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer text-emerald-950">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer text-emerald-950">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-700 focus:text-red-700">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth/login">
                  <Button
                    variant="outline"
                    className="border-[#1e4d2b] text-[#1e4d2b] hover:bg-[#1e4d2b]/5 h-10 px-5 rounded-lg font-semibold text-sm transition-all"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button className="bg-[#1e4d2b] hover:bg-[#1e4d2b]/90 text-white h-10 px-5 rounded-lg font-semibold text-sm shadow-md shadow-emerald-900/10 transition-all">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-4 md:hidden">
            {user && (
              <Link to="/cart" className="relative p-2 text-emerald-900">
                <ShoppingCart className="h-6 w-6" />
                {cartItems?.items?.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-bold text-white">
                    {cartItems.items.length}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-emerald-900 hover:bg-emerald-50 rounded-lg"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-800/10 bg-white px-4 py-4 space-y-4">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-semibold text-emerald-900/80 hover:bg-emerald-50 hover:text-emerald-950 transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-emerald-800/5 pt-4">
            {user ? (
              <div className="space-y-2 px-3">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10 bg-emerald-800">
                    <AvatarFallback className="bg-emerald-800 text-white font-bold">
                      {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-emerald-900 text-sm">{user.name}</p>
                    <p className="text-xs text-emerald-900/60">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/dashboard");
                  }}
                  className="flex w-full items-center gap-2 py-2 text-emerald-900 font-medium text-sm"
                >
                  <ClipboardList className="h-5 w-5 opacity-70" /> My Orders
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/dashboard");
                  }}
                  className="flex w-full items-center gap-2 py-2 text-emerald-900 font-medium text-sm"
                >
                  <User className="h-5 w-5 opacity-70" /> Profile
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center gap-2 py-2 text-red-600 font-medium text-sm mt-4"
                >
                  <LogOut className="h-5 w-5 opacity-70" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 px-3">
                <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#1e4d2b] text-[#1e4d2b] h-11 rounded-lg font-semibold text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#1e4d2b] hover:bg-[#1e4d2b]/95 text-white h-11 rounded-lg font-semibold text-sm shadow-md">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
