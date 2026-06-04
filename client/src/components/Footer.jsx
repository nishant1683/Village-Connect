import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import logoImg from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#1a3a2a] text-[rgba(255,255,255,0.75)] pt-14 pb-8 px-6 sm:px-12 lg:px-20 border-t border-emerald-900/10">
      <div className="mx-auto max-w-7xl">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-10">
          
          {/* Column 1 - Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="Village-Connect" className="h-10 w-auto brightness-0 invert" />
              <span className="font-bold text-white text-lg">Village-Connect</span>
            </div>
            <p className="text-sm leading-relaxed text-emerald-100/70 max-w-md">
              Connecting villages. Empowering communities. Facilitating direct commerce and resource management for sustainable rural development.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white tracking-wide text-sm uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Admin Access */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white tracking-wide text-sm uppercase">Admin</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/auth/admin/login" 
                  className="flex items-center gap-2 text-[13px] text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.9)] transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  Admin Portal Login
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-[13px] text-emerald-100/50">
            © 2025 Village-Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
