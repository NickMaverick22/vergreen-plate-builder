
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Utensils, Heart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to auth after 3 seconds for demo purposes
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-vergreen-50 to-emerald-50 p-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        {/* Logo */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-white rounded-3xl neumorphic flex items-center justify-center animate-bounce-subtle">
            <Leaf className="w-16 h-16 text-vergreen-600" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-vergreen-400 rounded-full animate-pulse"></div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-vergreen-800 tracking-tight">
            ver<span className="text-vergreen-600">green</span>
          </h1>
          <p className="text-vergreen-600 font-medium tracking-wider text-sm uppercase">
            Fresh Healthy Food
          </p>
        </div>

        {/* Feature Icons */}
        <div className="flex justify-center space-x-6 py-4">
          <div className="w-12 h-12 bg-white rounded-2xl neumorphic flex items-center justify-center">
            <Utensils className="w-6 h-6 text-vergreen-500" />
          </div>
          <div className="w-12 h-12 bg-white rounded-2xl neumorphic flex items-center justify-center">
            <Heart className="w-6 h-6 text-vergreen-500" />
          </div>
          <div className="w-12 h-12 bg-white rounded-2xl neumorphic flex items-center justify-center">
            <Leaf className="w-6 h-6 text-vergreen-500" />
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <p className="text-vergreen-700 text-lg">
            Welcome to your healthy food journey
          </p>
          <Button 
            onClick={() => navigate('/auth')}
            className="w-full bg-vergreen-600 hover:bg-vergreen-700 text-white font-medium py-3 rounded-2xl transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Button>
        </div>

        {/* Loading indicator */}
        <div className="flex items-center justify-center space-x-2 pt-4">
          <div className="w-2 h-2 bg-vergreen-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-vergreen-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-vergreen-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
