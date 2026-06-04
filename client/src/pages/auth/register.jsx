import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/shop/home";

  const { registerUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const result = await registerUser(userName, email, password);
    setLoading(false);

    if (result.success) {
      toast({
        title: "Account Created",
        description: "Welcome to Village-Connect! Your account is ready.",
      });
      navigate("/shop/home");
    } else {
      toast({
        title: "Registration Failed",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="register-wrapper">
      <style>{`
        .register-wrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f7f5;
          font-family: 'Inter', sans-serif;
          padding: 24px 16px;
          box-sizing: border-box;
        }
        .register-card {
          width: 100%;
          max-width: 460px;
          background: white;
          border-radius: 16px;
          padding: 36px 24px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
          border: 1px solid rgba(0, 0, 0, 0.03);
        }
        @media (min-width: 640px) {
          .register-card {
            padding: 40px;
          }
        }
        .register-title {
          font-size: 24px;
          font-weight: 800;
          color: #0f1f15;
          margin: 0 0 6px 0;
          text-align: center;
        }
        .register-subtext {
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
          margin-top: 10px;
        }
        .submit-btn:hover {
          background: #15371f;
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
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
      `}</style>

      <div className="register-card">
        <h2 className="register-title">Create new account</h2>
        <p className="register-subtext">Join the Village-Connect community today</p>

        <form onSubmit={handleSignUp}>
          {/* User Name input */}
          <div className="input-group">
            <label className="input-label">User Name</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <User className="h-5 w-5" />
              </span>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your user name"
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Email input */}
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
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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

          {/* Submit button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="footer-links">
          Already have an account?{" "}
          <Link to="/auth/login" className="footer-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
