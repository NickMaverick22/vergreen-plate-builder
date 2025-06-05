import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, CheckCircle, Package, Bell } from "lucide-react";
import CustomerNavbar from "@/components/CustomerNavbar";
const OrderTracking = () => {
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState(2);
  const [estimatedTime, setEstimatedTime] = useState(12);
  const orderSteps = [{
    id: 1,
    title: "Order Submitted",
    description: "Your order has been received",
    icon: CheckCircle,
    time: "2 min ago"
  }, {
    id: 2,
    title: "Order Validated",
    description: "Kitchen has confirmed your order",
    icon: CheckCircle,
    time: "1 min ago"
  }, {
    id: 3,
    title: "Preparing",
    description: "Your healthy plate is being prepared",
    icon: Package,
    time: "In progress"
  }, {
    id: 4,
    title: "Ready for Pickup",
    description: "Your order is ready!",
    icon: Bell,
    time: "Est. 12 min"
  }];

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime(prev => {
        if (prev > 0) {
          if (prev === 8 && currentStatus === 2) {
            setCurrentStatus(3);
          }
          if (prev === 3 && currentStatus === 3) {
            setCurrentStatus(4);
          }
          return prev - 1;
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentStatus]);
  const formatTime = minutes => {
    if (minutes <= 0) return "Ready!";
    return `${minutes} min`;
  };
  return <div className="min-h-screen bg-gradient-to-br from-vergreen-50 to-emerald-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-vergreen-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="text-vergreen-600 hover:text-vergreen-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-bold text-vergreen-800">Order Tracking</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Order Info Card */}
        <Card className="bg-white rounded-3xl neumorphic p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-vergreen-400 to-vergreen-500 rounded-3xl mx-auto flex items-center justify-center animate-bounce-subtle">
            <Package className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-vergreen-800 mb-2">
              Order #VG-2024-001
            </h2>
            <p className="text-vergreen-600 mb-4">
              Mediterranean Power Bowl
            </p>
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-2xl ${currentStatus === 4 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
              <Clock className="w-4 h-4" />
              <span className="font-medium">
                {currentStatus === 4 ? "Ready for pickup!" : `${formatTime(estimatedTime)} remaining`}
              </span>
            </div>
          </div>
        </Card>

        {/* Progress Tracker */}
        <Card className="bg-white rounded-3xl neumorphic p-6">
          <h3 className="text-lg font-semibold text-vergreen-800 mb-6">
            Order Progress
          </h3>
          <div className="space-y-6">
            {orderSteps.map((step, index) => <div key={step.id} className="flex items-start space-x-4">
                <div className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${currentStatus >= step.id ? 'bg-vergreen-500 text-white' : currentStatus === step.id - 1 ? 'bg-vergreen-200 text-vergreen-600 animate-pulse' : 'bg-gray-200 text-gray-400'}`}>
                  <step.icon className="w-5 h-5" />
                  {index < orderSteps.length - 1 && <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-8 transition-all duration-500 ${currentStatus > step.id ? 'bg-vergreen-500' : 'bg-gray-200'}`} />}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium transition-all duration-300 ${currentStatus >= step.id ? 'text-vergreen-800' : 'text-gray-500'}`}>
                      {step.title}
                    </h4>
                    <span className={`text-sm transition-all duration-300 ${currentStatus >= step.id ? 'text-vergreen-600' : 'text-gray-400'}`}>
                      {step.time}
                    </span>
                  </div>
                  <p className={`text-sm transition-all duration-300 ${currentStatus >= step.id ? 'text-vergreen-600' : 'text-gray-400'}`}>
                    {step.description}
                  </p>
                </div>
              </div>)}
          </div>
        </Card>

        {/* Pickup Code */}
        <Card className="bg-gradient-to-r from-vergreen-500 to-vergreen-600 rounded-3xl p-6 text-white text-center bg-green-400">
          <h3 className="text-lg font-semibold mb-2">Pickup Code</h3>
          <div className="bg-white/20 rounded-2xl p-4 mb-3">
            <span className="text-3xl font-bold tracking-wider">VG24</span>
          </div>
          <p className="text-sm opacity-90">
            Show this code when collecting your order
          </p>
        </Card>

        {/* Queue Status */}
        <Card className="bg-white rounded-3xl neumorphic p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-vergreen-800 mb-1">
                Queue Position
              </h3>
              <p className="text-vergreen-600">
                You're in a great spot!
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-vergreen-800 mb-1">
                {currentStatus >= 3 ? "1st" : "3rd"}
              </div>
              <p className="text-sm text-vergreen-600">in line</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={() => navigate('/history')} variant="outline" className="w-full border-vergreen-200 text-vergreen-700 hover:bg-vergreen-50 rounded-2xl py-3">
            View Order History
          </Button>
          <Button onClick={() => navigate('/plate-builder')} className="w-full bg-vergreen-600 hover:bg-vergreen-700 text-white rounded-2xl py-3">
            Order Another Plate
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <CustomerNavbar />
    </div>;
};
export default OrderTracking;