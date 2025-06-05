
import { useState, useEffect } from "react";
import { Leaf, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import InteractiveButton from "@/components/ui/interactive-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin ? "You've been logged in successfully." : "Your account has been created successfully.",
      });
      // Navigate to dashboard after success
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.location.href = '/dashboard';
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vergreen-50 to-emerald-50 p-4 fade-in">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 slide-up">
          <InteractiveButton
            variant="ghost"
            to="/"
            className="text-vergreen-600 hover:text-vergreen-700 px-3 py-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </InteractiveButton>
          <div className="flex items-center space-x-2">
            <Leaf className="w-6 h-6 text-vergreen-600" />
            <span className="font-bold text-vergreen-800">vergreen</span>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl neumorphic p-8 space-y-6 slide-up" style={{ animationDelay: '0.1s' }}>
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-vergreen-800">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-vergreen-600">
              {isLogin ? "Sign in to your account" : "Join the healthy food revolution"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-vergreen-700 font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-vergreen-500" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 bg-vergreen-50 border-vergreen-200 rounded-2xl focus:ring-vergreen-500 focus:border-vergreen-500 transition-all duration-300"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-vergreen-700 font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-vergreen-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 bg-vergreen-50 border-vergreen-200 rounded-2xl focus:ring-vergreen-500 focus:border-vergreen-500 transition-all duration-300"
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 bg-vergreen-50 border-vergreen-200 rounded-2xl focus:ring-vergreen-500 focus:border-vergreen-500 transition-all duration-300"
                />
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-vergreen-600 hover:text-vergreen-700 font-medium transition-colors duration-300"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <InteractiveButton
              variant="primary"
              size="large"
              disabled={isLoading}
              className="w-full"
              onClick={() => {}}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isLogin ? "Signing in..." : "Creating account..."}</span>
                </div>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </InteractiveButton>
          </form>

          {/* Toggle */}
          <div className="text-center pt-4 border-t border-vergreen-100">
            <p className="text-vergreen-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-vergreen-700 font-medium hover:text-vergreen-800 transition-colors duration-300"
              >
                {isLogin ? "Create Account" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
