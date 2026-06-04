import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Key, Shield, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loginAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin/dashboard";

  const handleAdminSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password || !adminCode) {
      toast({
        title: "Error",
        description: "Please fill in all fields including the Access Code.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const result = await loginAdmin(email, password, adminCode);
    setLoading(false);

    if (result.success) {
      toast({
        title: "Access Granted",
        description: "Authenticated successfully as Admin.",
      });
      navigate(from, { replace: true });
    } else {
      toast({
        title: "Authentication Failed",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="admin-login-wrapper">
      <style>{`
        .admin-login-wrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #040d06;
          background-image: 
            radial-gradient(at 0% 0%, rgba(30, 80, 40, 0.25) 0, transparent 50%),
            radial-gradient(at 100% 100%, rgba(10, 40, 20, 0.3) 0, transparent 50%);
          position: relative;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          padding: 16px;
          box-sizing: border-box;
        }

        /* Techy Grid Overlay */
        .admin-login-wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 24px 24px;
          z-index: 1;
          pointer-events: none;
        }

        .admin-card {
          position: relative;
          z-index: 2;
          width: 92vw;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 36px 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          box-sizing: border-box;
        }

        @media (min-width: 640px) {
          .admin-card {
            padding: 48px 40px;
            width: 420px;
          }
        }

        .portal-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 24px;
        }

        .shield-icon-container {
          background: rgba(45, 122, 58, 0.15);
          border: 1px solid rgba(45, 122, 58, 0.3);
          width: 54px;
          height: 54px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4caf7d;
          margin-bottom: 12px;
          box-shadow: 0 0 15px rgba(76, 175, 125, 0.1);
        }

        .badge-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #4caf7d;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .portal-title {
          font-size: 24px;
          font-weight: 800;
          color: white;
          margin: 0 0 4px 0;
        }

        .portal-subtext {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        /* Warning Notice Box */
        .warning-box {
          background: rgba(240, 165, 0, 0.08);
          border-left: 3px solid #f0a500;
          border-radius: 4px;
          padding: 12px;
          margin-bottom: 24px;
        }

        .warning-text {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.4;
          margin: 0;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
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
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          font-size: 14px;
          color: white;
          transition: all 0.2s;
        }

        .input-field::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .input-field:focus {
          border-color: #4caf7d;
          background: rgba(255, 255, 255, 0.09);
          outline: none;
          box-shadow: 0 0 0 3px rgba(76, 175, 127, 0.2);
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .eye-toggle-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.4);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
        }

        .eye-toggle-btn:hover {
          color: white;
        }

        .submit-btn {
          width: 100%;
          height: 50px;
          background: linear-gradient(135deg, #1e4d2b, #2d7a3a);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 15px rgba(30, 77, 43, 0.25);
        }

        .submit-btn:hover {
          filter: brightness(1.15);
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0 6px 20px rgba(30, 77, 43, 0.35);
        }

        .submit-btn:active {
          transform: translateY(0) scale(1);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .back-link-box {
          margin-top: 28px;
          text-align: center;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.45);
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }

        .back-link:hover {
          color: white;
        }
      `}</style>

      <div className="admin-card">
        {/* Portal Header */}
        <div className="portal-header">
          <div className="shield-icon-container">
            <Shield className="h-7 w-7" />
          </div>
          <span className="badge-label">Admin Portal</span>
          <h2 className="portal-title">Admin Sign In</h2>
          <p className="portal-subtext">Authorized personnel only</p>
        </div>

        {/* Warning notice box */}
        <div className="warning-box">
          <p className="warning-text">
            ⚠️ This portal is for administrators only. Unauthorized access attempts are monitored and prohibited.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAdminSignIn}>
          {/* Email input */}
          <div className="input-group">
            <label className="input-label">Admin Email</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <Mail className="h-5 w-5" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@villageconnect.com"
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Password input */}
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

          {/* Access Code input */}
          <div className="input-group">
            <label className="input-label">Admin Access Code</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <Key className="h-5 w-5" />
              </span>
              <input
                type="password"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                placeholder="Enter access code"
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Authenticating..." : "Sign In to Portal"}
          </button>
        </form>

        {/* Back Link */}
        <div className="back-link-box">
          <Link to="/auth/login" className="back-link">
            <ArrowLeft className="h-4 w-4" />
            Back to User Login
          </Link>
        </div>
      </div>
    </div>
  );
}
