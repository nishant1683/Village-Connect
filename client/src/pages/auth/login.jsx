import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/shop/home";

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const result = await loginUser(email, password);
    setLoading(false);

    if (result.success) {
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      navigate(from, { replace: true });
    } else {
      toast({
        title: "Login Failed",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignIn = () => {
    toast({
      title: "Notice",
      description: "Google login is currently disabled for this workspace.",
    });
  };

  return (
    <div className="login-container">
      <style>{`
        .login-container {
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
        }
        @media (min-width: 640px) {
          .login-container {
            flex-direction: row;
          }
        }
        /* Left Hero Panel */
        .hero-panel {
          position: relative;
          background-image: url('https://images.unsplash.com/photo-1500382017468-9049fed747ef');
          background-size: cover;
          background-position: center;
          height: 220px;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 24px;
          box-sizing: border-box;
        }
        @media (min-width: 640px) {
          .hero-panel {
            height: 100vh;
            width: 45%;
            padding: 40px;
            justify-content: space-between;
          }
        }
        @media (min-width: 1024px) {
          .hero-panel {
            width: 50%;
            padding: 60px;
          }
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 50, 20, 0.6);
          z-index: 1;
        }
        .hero-content-top {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        @media (min-width: 640px) {
          .hero-content-top {
            align-items: flex-start;
            text-align: left;
          }
        }
        .hero-logo-box {
          margin-bottom: 8px;
          color: white;
        }
        .hero-title {
          font-size: 20px;
          font-weight: 800;
          color: white;
          margin: 0 0 6px 0;
        }
        @media (min-width: 640px) {
          .hero-title {
            font-size: 28px;
          }
        }
        @media (min-width: 1024px) {
          .hero-title {
            font-size: 36px;
          }
        }
        .hero-subtext {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
        }
        @media (min-width: 640px) {
          .hero-subtext {
            font-size: 16px;
          }
        }
        .hero-features {
          display: none;
          position: relative;
          z-index: 2;
          flex-direction: column;
          gap: 16px;
          margin-top: auto;
        }
        @media (min-width: 640px) {
          .hero-features {
            display: flex;
          }
        }
        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          padding: 12px 16px;
          color: white;
        }
        .feature-title {
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 2px;
        }
        .feature-desc {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.75);
        }

        /* Right Form Panel */
        .form-panel {
          flex: 1;
          background: #f5f7f5;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          box-sizing: border-box;
        }
        @media (min-width: 640px) {
          .form-panel {
            width: 55%;
            height: 100vh;
            overflow-y: auto;
          }
        }
        @media (min-width: 1024px) {
          .form-panel {
            width: 50%;
          }
        }
        .form-card {
          width: 100%;
          max-width: 460px;
          background: white;
          border-radius: 16px;
          padding: 32px 24px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
          border: 1px solid rgba(0, 0, 0, 0.03);
        }
        @media (min-width: 640px) {
          .form-card {
            padding: 40px;
          }
        }
        .form-title {
          font-size: 22px;
          font-weight: 800;
          color: #0f1f15;
          margin: 0 0 6px 0;
          text-align: center;
        }
        .form-subtext {
          font-size: 14px;
          color: #607065;
          margin: 0 0 28px 0;
          text-align: center;
        }
        .input-group {
          margin-bottom: 20px;
        }
        .input-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #304035;
          margin-bottom: 6px;
        }
        .input-wrapper {
          position: relative;
        }
        .input-field {
          width: 100%;
          height: 48px;
          padding: 0 16px 0 44px;
          box-sizing: border-box;
          border: 1px solid #d0d7d3;
          border-radius: 8px;
          background: #fafbfa;
          font-size: 14px;
          color: #0f1f15;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #1e4d2b;
          background: white;
          outline: none;
          box-shadow: 0 0 0 3px rgba(30, 77, 43, 0.15);
        }
        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #7a8a80;
          display: flex;
          align-items: center;
          pointer-events: none;
        }
        .eye-toggle-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #7a8a80;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .eye-toggle-btn:hover {
          color: #1e4d2b;
        }
        .options-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          font-size: 13px;
        }
        .remember-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #304035;
          cursor: pointer;
        }
        .remember-checkbox {
          cursor: pointer;
          accent-color: #1e4d2b;
        }
        .forgot-link {
          color: #1e4d2b;
          text-decoration: none;
          font-weight: 600;
        }
        .forgot-link:hover {
          text-decoration: underline;
        }
        .submit-btn {
          width: 100%;
          height: 48px;
          background: #1e4d2b;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .submit-btn:hover {
          background: #15371f;
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 20px 0;
          color: #7a8a80;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e0e5e2;
        }
        .divider:not(:empty)::before {
          margin-right: .5em;
        }
        .divider:not(:empty)::after {
          margin-left: .5em;
        }
        .google-btn {
          width: 100%;
          height: 46px;
          background: white;
          border: 1px solid #d0d7d3;
          border-radius: 8px;
          color: #304035;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.2s;
        }
        .google-btn:hover {
          background: #fafbfa;
          border-color: #b8c2bc;
        }
        .footer-links {
          margin-top: 24px;
          text-align: center;
          font-size: 14px;
          color: #607065;
        }
        .footer-link {
          color: #1e4d2b;
          text-decoration: none;
          font-weight: 700;
        }
        .footer-link:hover {
          text-decoration: underline;
        }
        .admin-footer-box {
          margin-top: 20px;
          text-align: center;
        }
        .admin-link {
          font-size: 12px;
          color: #7a8a80;
          text-decoration: none;
          transition: color 0.2s;
        }
        .admin-link:hover {
          color: #1e4d2b;
          text-decoration: underline;
        }
      `}</style>

      {/* Left Panel */}
      <div className="hero-panel">
        <div className="hero-overlay"></div>
        <div className="hero-content-top">
          <div className="hero-logo-box">
            <svg 
              className="w-14 h-14" 
              viewBox="0 0 64 64" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 40V52H28V40H12Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M8 40L20 28L32 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 45V52" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M44 48C48 48 51 45 51 41C51 37.5 48.5 35 45 34.5C45 30 41 26 36 26C32.5 26 29.5 28.5 28.5 31.5C26.5 31.5 25 33 25 35C25 37 26.5 38.5 28.5 38.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M36 38.5V52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M6 56C18 53 32 53 44 55C50 56 56 57 58 56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M14 56C24 54 38 54 50 56.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="hero-title">Welcome to Village-Connect</h1>
          <p className="hero-subtext">Connecting villages. Empowering communities.</p>
        </div>

        {/* Feature Cards bottom */}
        <div className="hero-features">
          <div className="feature-card">
            <p className="feature-title">Community Focused</p>
            <p className="feature-desc">Fostering collaboration between neighbors and leaders.</p>
          </div>
          <div className="feature-card">
            <p className="feature-title">Secure & Reliable</p>
            <p className="feature-desc">Using best security practices to protect community logs.</p>
          </div>
          <div className="feature-card">
            <p className="feature-title">Better Village Management</p>
            <p className="feature-desc">Streamlining direct commerce and request updates.</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="form-panel">
        <div className="form-card">
          <h2 className="form-title">Sign in to your account</h2>
          <p className="form-subtext">Access your account by logging in below</p>

          <form onSubmit={handleSignIn}>
            {/* Email Input */}
            <div className="input-group">
              <label className="input-label">Email</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Mail className="h-5 w-5" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="eye-toggle-btn"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="options-row">
              <label className="remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="remember-checkbox"
                />
                Remember me
              </label>
              <Link to="/auth/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="divider">or</div>

          {/* Google Sign In */}
          <button type="button" onClick={handleGoogleSignIn} className="google-btn">
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          {/* Footer Navigation Links */}
          <div className="footer-links">
            Don't have an account?{" "}
            <Link to="/auth/register" className="footer-link">
              Register
            </Link>
          </div>

          <div className="admin-footer-box">
            <Link to="/auth/admin/login" className="admin-link">
              Are you an admin? Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
