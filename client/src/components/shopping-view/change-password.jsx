import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import axios from "axios";
import { API_URL } from "@/config/api-url";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Weak Password",
        description: "New password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const token =
        localStorage.getItem("vc_user_token") ||
        localStorage.getItem("vc_admin_token");

      const response = await axios.post(
        `${API_URL}/api/auth/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          withCredentials: true,
        }
      );

      if (response.data?.success) {
        toast({
          title: "Success",
          description: response.data.message || "Password updated successfully!",
        });
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast({
          title: "Error",
          description: response.data?.message || "Failed to change password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Change password request error:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "An error occurred while changing password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-md border border-border">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <CardTitle className="text-xl font-bold">Security & Password</CardTitle>
        </div>
        <CardDescription>
          Update your account password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="oldPassword"
                name="oldPassword"
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter current password"
                value={formData.oldPassword}
                onChange={handleChange}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password (min. 6 characters)"
                value={formData.newPassword}
                onChange={handleChange}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4 animate-spin" /> Updating Password...
              </span>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
