import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { loginUser } from "@/store/auth-slice";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [role, setRole] = useState("user"); // "user" or "admin"
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSignIn = (event) => {
    if (event) event.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Note: backend uses email/password for authentication, 
    // but we can pass the role metadata if required by backend in the future.
    dispatch(loginUser(formData)).then((data) => {
      setLoading(false);
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message || "Logged in successfully!",
        });
      } else {
        toast({
          title: data?.payload?.message || "Login failed!",
          variant: "destructive",
        });
      }
    });
  };

  const handleGoogleSignIn = () => {
    toast({
      title: "Google login is not configured yet.",
      description: "Please sign in using your email and password.",
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#f5f5f5] text-[#111827]">
      {/* LEFT PANEL: Hero/Branding */}
      <div 
        className="relative w-full md:w-[45%] lg:w-1/2 h-[180px] md:h-auto flex flex-col items-center justify-center p-6 md:p-12 text-white bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef')`
        }}
      >
        {/* Dark Green Overlay */}
        <div className="absolute inset-0 bg-[#003c14]/55 mix-blend-multiply"></div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-lg">
          {/* Logo SVG (House + Tree + Landscape) - Hidden on Mobile */}
          <div className="hidden md:block mb-6">
            <svg 
              className="w-24 h-24 text-white opacity-95" 
              viewBox="0 0 64 64" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* House */}
              <path d="M12 40V52H28V40H12Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M8 40L20 28L32 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 45V52" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              {/* Tree */}
              <path d="M44 48C48 48 51 45 51 41C51 37.5 48.5 35 45 34.5C45 30 41 26 36 26C32.5 26 29.5 28.5 28.5 31.5C26.5 31.5 25 33 25 35C25 37 26.5 38.5 28.5 38.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M36 38.5V52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              {/* Land Curves */}
              <path d="M6 56C18 53 32 53 44 55C50 56 56 57 58 56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M14 56C24 54 38 54 50 56.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center text-white drop-shadow-md">
            Welcome to Village-Connect
          </h1>
          
          {/* Subtext - Hidden on Mobile */}
          <p className="hidden md:block text-white/90 text-sm md:text-base text-center mt-3 font-medium max-w-md">
            Connecting villages. Empowering communities.
          </p>

          {/* Bottom Feature Highlights - Hidden on Mobile */}
          <div className="hidden md:flex items-center justify-between w-full mt-16 border-t border-white/20 pt-8 gap-2">
            {/* Feature 1 */}
            <div className="flex-1 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mx-auto mb-2 text-white/90">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0 1 10.089 20M3 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M3 19.128v-.003c0-1.113.285-2.16.786-3.07M3 19.128v.109A11.386 11.386 0 0 0 8.91 20M8.91 20k-3.91 0" />
              </svg>
              <span className="text-[11px] lg:text-xs font-semibold text-white/90 uppercase tracking-wider block">Community Focused</span>
            </div>

            {/* Divider */}
            <div className="h-10 border-l border-white/25"></div>

            {/* Feature 2 */}
            <div className="flex-1 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mx-auto mb-2 text-white/90">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-[11px] lg:text-xs font-semibold text-white/90 uppercase tracking-wider block">Secure & Reliable</span>
            </div>

            {/* Divider */}
            <div className="h-10 border-l border-white/25"></div>

            {/* Feature 3 */}
            <div className="flex-1 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mx-auto mb-2 text-white/90">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125z" />
              </svg>
              <span className="text-[11px] lg:text-xs font-semibold text-white/90 uppercase tracking-wider block">Better Management</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Login Form */}
      <div className="w-full md:w-[55%] lg:w-1/2 flex items-center justify-center py-8 px-6 md:px-12 lg:px-16 min-h-[calc(100vh-180px)] md:min-h-screen">
        <div className="w-full max-w-[460px] bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100 flex flex-col">
          {/* Form Header */}
          <div className="text-center md:text-left mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111827]">
              Sign in to your account
            </h2>
            <p className="text-sm text-[#6b7280] mt-1.5 font-medium">
              Access your account by logging in below
            </p>
          </div>

          {/* Role Toggle Selector */}
          <div className="mb-5">
            <label className="text-xs font-bold text-[#111827] uppercase tracking-wider block mb-1">
              Login as
            </label>
            <div className="w-full flex rounded-lg overflow-hidden border border-[#d1d5db] h-12">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`w-1/2 h-full flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 ${
                  role === "user"
                    ? "bg-[#1e4d2b] text-white shadow-inner"
                    : "bg-white text-[#111827] hover:bg-gray-50"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                User
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`w-1/2 h-full flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 ${
                  role === "admin"
                    ? "bg-[#1e4d2b] text-white shadow-inner"
                    : "bg-white text-[#111827] hover:bg-gray-50"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                Admin
              </button>
            </div>
            <span className="text-[11px] text-[#6b7280] mt-1.5 block text-center md:text-left font-medium">
              Choose your role to continue
            </span>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="text-xs font-bold text-[#111827] uppercase tracking-wider block mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b7280]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 h-12 bg-white border border-[#d1d5db] rounded-lg text-sm text-[#111827] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#1e4d2b] focus:border-[#1e4d2b] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-bold text-[#111827] uppercase tracking-wider block mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b7280]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 h-12 bg-white border border-[#d1d5db] rounded-lg text-sm text-[#111827] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#1e4d2b] focus:border-[#1e4d2b] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6b7280] hover:text-[#111827] transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Options Row */}
          <div className="flex items-center justify-between mt-4 mb-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#d1d5db] text-[#1e4d2b] focus:ring-[#1e4d2b] h-4.5 w-4.5 cursor-pointer accent-[#1e4d2b]"
              />
              <span className="text-sm font-medium text-[#6b7280]">Remember me</span>
            </label>
            <Link 
              to="/auth/forgot-password" 
              className="text-sm font-bold text-[#1e4d2b] hover:text-[#2d6a3f] transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handleSignIn}
            className="w-full h-12 bg-[#1e4d2b] text-white font-bold rounded-lg hover:bg-[#2d6a3f] transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-75 disabled:pointer-events-none active:scale-[0.99]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d1d5db]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-semibold">
              <span className="bg-white px-3 text-[#6b7280] tracking-wider">or</span>
            </div>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full h-12 flex items-center justify-center gap-3 border border-[#d1d5db] rounded-lg bg-white text-sm font-semibold text-[#111827] hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Register Link */}
          <div className="text-center mt-8 text-sm font-semibold text-[#6b7280]">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-[#1e4d2b] hover:text-[#2d6a3f] hover:underline font-bold transition-all ml-1"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;
