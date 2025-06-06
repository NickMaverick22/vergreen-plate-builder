
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Mail, Lock, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn(formData.email, formData.password);
      navigate('/admin/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vergreen-50 to-emerald-50 p-4">
      <div className="max-w-md mx-auto pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-3xl neumorphic mx-auto flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-vergreen-600" />
          </div>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Leaf className="w-6 h-6 text-vergreen-600" />
            <span className="font-bold text-vergreen-800">vergreen</span>
          </div>
          <p className="text-vergreen-600">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl neumorphic p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-vergreen-800">
              Admin Login
            </h1>
            <p className="text-vergreen-600">
              Access the restaurant management system
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-vergreen-700 font-medium">
                Admin Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-vergreen-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@vergreen.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 bg-vergreen-50 border-vergreen-200 rounded-2xl focus:ring-vergreen-500 focus:border-vergreen-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-vergreen-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-vergreen-500" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter admin password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 bg-vergreen-50 border-vergreen-200 rounded-2xl focus:ring-vergreen-500 focus:border-vergreen-500"
                />
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-sm text-vergreen-600 hover:text-vergreen-700 font-medium"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-vergreen-600 hover:bg-vergreen-700 text-white font-medium py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-70"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In to Admin"
              )}
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-vergreen-100">
            <p className="text-sm text-vergreen-600">
              Need help accessing your account?
              <br />
              <button className="text-vergreen-700 font-medium hover:text-vergreen-800">
                Contact IT Support
              </button>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-white/60 rounded-2xl text-center">
          <p className="text-xs text-vergreen-600 mb-2">Demo Credentials:</p>
          <p className="text-xs text-vergreen-700">
            Email: admin@vergreen.com<br />
            Password: admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
