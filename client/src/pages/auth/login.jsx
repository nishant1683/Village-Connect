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
    <div className="login-page-wrapper">
      {/* Self-contained styling matching user's typography, responsive dimensions and colors */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        
        .login-page-wrapper {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('https://images.unsplash.com/photo-1500382017468-9049fed747ef');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          background-repeat: no-repeat;
          position: relative;
          padding: 16px;
          box-sizing: border-box;
        }

        .login-page-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.52);
          z-index: 1;
        }

        .login-card {
          position: relative;
          z-index: 2;
          width: 92vw;
          max-width: 420px;
          padding: 24px 20px;
          background: rgba(20, 35, 20, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          max-height: 94vh;
          overflow-y: auto;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }

        .login-card::-webkit-scrollbar {
          width: 4px;
        }
        .login-card::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .login-title-container {
          text-align: center;
          margin-bottom: 20px;
        }

        .login-logo {
          margin-bottom: 8px;
        }

        .login-title {
          font-size: 22px;
          font-weight: 700;
          color: white;
          margin: 0 0 6px 0;
          line-height: 1.25;
        }

        .login-subtext {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          line-height: 1.4;
        }

        .login-label {
          display: block;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
          margin-bottom: 6px;
        }

        .toggle-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 3px;
          margin-bottom: 20px;
          box-sizing: border-box;
        }

        .toggle-btn {
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 6px;
          transition: all 0.2s;
          color: rgba(255, 255, 255, 0.8);
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .toggle-btn.active {
          background: #2d6a3f;
          color: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .toggle-btn:not(.active):hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .input-group {
          margin-bottom: 16px;
          position: relative;
        }

        .login-input {
          width: 100%;
          height: 48px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: white;
          border-radius: 8px;
          font-size: 14px;
          padding: 0 16px 0 44px;
          transition: all 0.2s;
          box-sizing: border-box;
        }

        .login-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .login-input:focus {
          border-color: #4caf7d;
          background: rgba(255, 255, 255, 0.15);
          outline: none;
          box-shadow: 0 0 0 2px rgba(76, 175, 125, 0.2);
        }

        .login-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.6);
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .login-eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.6);
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
        }

        .login-eye-btn:hover {
          color: white;
        }

        .options-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .remember-me-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          user-select: none;
        }

        .remember-checkbox {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: transparent;
          cursor: pointer;
          accent-color: #2d6a3f;
        }

        .login-link {
          color: #6fcf97;
          font-weight: 600;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s;
        }

        .login-link:hover {
          color: #82e2ab;
          text-decoration: underline;
        }

        .btn-signin {
          width: 100%;
          height: 50px;
          background: #2d6a3f;
          color: white;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(45, 106, 63, 0.3);
        }

        .btn-signin:hover {
          background: #245c34;
          box-shadow: 0 6px 16px rgba(45, 106, 63, 0.4);
        }

        .btn-signin:active {
          transform: scale(0.99);
        }

        .btn-signin:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-divider-row {
          position: relative;
          text-align: center;
          margin: 18px 0;
        }

        .login-divider-line {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .login-divider-line::before {
          content: "";
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .login-divider-text {
          position: relative;
          display: inline-block;
          padding: 0 12px;
          background: rgb(24, 34, 24); /* Matches card color overlay */
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .btn-google {
          width: 100%;
          height: 48px;
          background: white;
          color: #333;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          border: 1px solid #ddd;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
        }

        .btn-google:hover {
          background: #f9fafb;
          border-color: #ccc;
        }

        .btn-google:active {
          transform: scale(0.99);
        }

        .register-footer {
          text-align: center;
          margin-top: 24px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 500;
        }

        /* TABLET RESPONSIVE STYLES */
        @media (min-width: 481px) and (max-width: 768px) {
          .login-card {
            width: 75vw;
            max-width: 500px;
            padding: 36px 32px;
          }
          .login-title {
            font-size: 26px;
          }
          .login-label {
            font-size: 12px;
          }
        }

        /* DESKTOP RESPONSIVE STYLES */
        @media (min-width: 769px) {
          .login-card {
            width: 480px;
            padding: 48px 40px;
            max-height: none;
            overflow-y: visible;
          }
          .login-title {
            font-size: 30px;
          }
          .login-label {
            font-size: 12px;
          }
        }
      `}</style>

      {/* Dark Overlay */}
      <div className="login-page-overlay"></div>

      {/* Centered Login Card */}
      <div className="login-card">
        {/* Title & Logo Container */}
        <div className="login-title-container">
          <div className="login-logo flex justify-center">
            <svg 
              className="w-16 h-16 text-white opacity-95" 
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
          <h1 className="login-title">Welcome to Village-Connect</h1>
          <p className="login-subtext">Access your account by logging in below</p>
        </div>

        {/* Role Toggle Selector */}
        <div>
          <label className="login-label">
            Login as
          </label>
          <div className="toggle-container">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`toggle-btn ${role === "user" ? "active" : ""}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              User
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`toggle-btn ${role === "admin" ? "active" : ""}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              Admin
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="input-group">
          <label className="login-label">Email</label>
          <div className="relative">
            <span className="login-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="login-input"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="login-label">Password</label>
          <div className="relative">
            <span className="login-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              className="login-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="login-eye-btn"
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

        {/* Options Row */}
        <div className="options-row">
          <label className="remember-me-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="remember-checkbox"
            />
            Remember me
          </label>
          <Link to="/auth/forgot-password" className="login-link">
            Forgot password?
          </Link>
        </div>

        {/* Sign In Button */}
        <button
          type="button"
          disabled={loading}
          onClick={handleSignIn}
          className="btn-signin"
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
        <div className="login-divider-row">
          <div className="login-divider-line"></div>
          <span className="login-divider-text">or</span>
        </div>

        {/* Continue with Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn-google"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        {/* Register Footer */}
        <div className="register-footer">
          Don't have an account?{" "}
          <Link to="/auth/register" className="login-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;
