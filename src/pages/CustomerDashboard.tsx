import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, ChefHat, Clock, History, Bell, Plus } from "lucide-react";
import CustomerNavbar from "@/components/CustomerNavbar";
const CustomerDashboard = () => {
  const navigate = useNavigate();
  const quickActions = [{
    title: "Compose My Plate",
    description: "Build your perfect healthy meal",
    icon: Plus,
    path: "/plate-builder",
    color: "bg-gradient-to-r from-vergreen-500 to-vergreen-600"
  }, {
    title: "My Orders",
    description: "Track your current orders",
    icon: Clock,
    path: "/tracking",
    color: "bg-gradient-to-r from-blue-500 to-blue-600"
  }, {
    title: "Order History",
    description: "View past orders & reorder",
    icon: History,
    path: "/history",
    color: "bg-gradient-to-r from-purple-500 to-purple-600"
  }];
  return <div className="min-h-screen bg-gradient-to-br from-vergreen-50 to-emerald-50 pb-20 bg-green-400 rounded-full">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-vergreen-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-vergreen-100 rounded-2xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-vergreen-600" />
            </div>
            <div>
              <h1 className="font-bold text-vergreen-800">vergreen</h1>
              <p className="text-xs text-vergreen-600">Fresh & Healthy</p>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-vergreen-600 hover:text-vergreen-700"
            >
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-3xl neumorphic p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-vergreen-400 to-vergreen-500 rounded-3xl mx-auto flex items-center justify-center animate-bounce-subtle">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-vergreen-800 mb-2">
              Welcome back, Alex! 👋
            </h2>
            <p className="text-vergreen-600">
              Ready to create your perfect healthy plate?
            </p>
          </div>
        </div>

        {/* Live Status */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl p-4 text-white text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Live Queue Status</span>
          </div>
          <p className="text-lg font-bold">8 plates ahead of you</p>
          <p className="text-sm opacity-90">Est. wait time: 12-15 minutes</p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-vergreen-800 px-2">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => <Card key={index} className="p-0 border-0 shadow-none bg-white rounded-3xl neumorphic overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105" onClick={() => navigate(action.path)}>
                <div className="flex items-center p-5">
                  <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center mr-4`}>
                    <action.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-vergreen-800 mb-1">
                      {action.title}
                    </h4>
                    <p className="text-sm text-vergreen-600">
                      {action.description}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-vergreen-100 rounded-xl flex items-center justify-center">
                    <span className="text-vergreen-600">→</span>
                  </div>
                </div>
              </Card>)}
          </div>
        </div>

        {/* Today's Special */}
        <div className="bg-white rounded-3xl neumorphic p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-vergreen-800">
              Today's Special
            </h3>
            <div className="w-8 h-8 bg-vergreen-100 rounded-xl flex items-center justify-center">
              <span className="text-lg">🌟</span>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-vergreen-700">
              Mediterranean Power Bowl
            </h4>
            <p className="text-sm text-vergreen-600">
              Quinoa base with grilled chicken, feta cheese, olives, and tahini dressing
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold text-vergreen-800">$12.99</span>
              <Button size="sm" className="bg-vergreen-600 hover:bg-vergreen-700 text-white rounded-xl" onClick={() => navigate('/plate-builder')}>
                Try It
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <CustomerNavbar />
    </div>;
};
export default CustomerDashboard;