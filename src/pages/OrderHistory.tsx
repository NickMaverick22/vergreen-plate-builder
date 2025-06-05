
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, Download, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CustomerNavbar from "@/components/CustomerNavbar";

const OrderHistory = () => {
  const navigate = useNavigate();

  const orders = [
    {
      id: "VG-2024-001",
      date: "Today, 12:30 PM",
      items: ["Mediterranean Power Bowl", "Tahini Dressing", "Extra Avocado"],
      total: 14.50,
      status: "Preparing",
      rating: null
    },
    {
      id: "VG-2024-002",
      date: "Yesterday, 1:15 PM",
      items: ["Asian Fusion Bowl", "Teriyaki Sauce", "Grilled Tofu"],
      total: 13.25,
      status: "Completed",
      rating: 5
    },
    {
      id: "VG-2024-003",
      date: "2 days ago, 12:45 PM",
      items: ["Green Goddess Salad", "Balsamic Glaze", "Feta Cheese"],
      total: 12.75,
      status: "Completed",
      rating: 4
    },
    {
      id: "VG-2024-004",
      date: "3 days ago, 1:00 PM",
      items: ["Protein Power Pasta", "Pesto Sauce", "Grilled Chicken"],
      total: 15.00,
      status: "Completed",
      rating: 5
    },
    {
      id: "VG-2024-005",
      date: "1 week ago, 12:20 PM",
      items: ["Vegan Paradise Bowl", "Olive Oil Dressing", "Mixed Nuts"],
      total: 11.50,
      status: "Completed",
      rating: 4
    }
  ];

  const handleReorder = (order) => {
    toast({
      title: "Reordering...",
      description: `Adding ${order.items[0]} to your cart`,
    });
    // Simulate navigation to plate builder with pre-filled items
    setTimeout(() => {
      navigate('/plate-builder');
    }, 1000);
  };

  const handleRating = (orderId, rating) => {
    toast({
      title: "Thanks for your feedback!",
      description: `You rated this order ${rating} stars`,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Preparing':
        return 'bg-orange-100 text-orange-800';
      case 'Ready':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-vergreen-100 text-vergreen-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating, orderId) => {
    if (rating) {
      return (
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      );
    }
    
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className="w-4 h-4 text-gray-300 cursor-pointer hover:text-yellow-400 transition-colors"
            onClick={() => handleRating(orderId, star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vergreen-50 to-emerald-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-vergreen-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="text-vergreen-600 hover:text-vergreen-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-bold text-vergreen-800">Order History</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Stats Card */}
        <Card className="bg-white rounded-3xl neumorphic p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-vergreen-800 mb-1">5</div>
              <div className="text-sm text-vergreen-600">Total Orders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-vergreen-800 mb-1">$67</div>
              <div className="text-sm text-vergreen-600">Total Spent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-vergreen-800 mb-1">4.6</div>
              <div className="text-sm text-vergreen-600">Avg Rating</div>
            </div>
          </div>
        </Card>

        {/* Orders List */}
        <div className="space-y-3">
          {orders.map((order) => (
            <Card key={order.id} className="bg-white rounded-3xl neumorphic p-5 space-y-4">
              {/* Order Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-vergreen-800">
                    Order {order.id}
                  </h3>
                  <p className="text-sm text-vergreen-600">{order.date}</p>
                </div>
                <Badge className={`${getStatusColor(order.status)} border-0`}>
                  {order.status}
                </Badge>
              </div>

              {/* Order Items */}
              <div className="space-y-1">
                {order.items.map((item, index) => (
                  <p key={index} className="text-sm text-vergreen-700">
                    {index === 0 ? "🍽️ " : "➕ "}{item}
                  </p>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-vergreen-600">Rate this order:</span>
                {renderStars(order.rating, order.id)}
              </div>

              {/* Order Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-vergreen-100">
                <div className="text-lg font-bold text-vergreen-800">
                  ${order.total.toFixed(2)}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-vergreen-200 text-vergreen-700 hover:bg-vergreen-50 rounded-xl"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Receipt
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleReorder(order)}
                    className="bg-vergreen-600 hover:bg-vergreen-700 text-white rounded-xl"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reorder
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center pt-4">
          <Button
            variant="outline"
            className="border-vergreen-200 text-vergreen-700 hover:bg-vergreen-50 rounded-2xl px-8"
          >
            Load More Orders
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <CustomerNavbar />
    </div>
  );
};

export default OrderHistory;
