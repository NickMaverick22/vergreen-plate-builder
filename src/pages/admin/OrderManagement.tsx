
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Clock, Filter, Search, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import AdminNavbar from "@/components/AdminNavbar";

const OrderManagement = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    {
      id: "VG-2024-001",
      customer: "Alex Johnson",
      items: ["Mediterranean Power Bowl", "Tahini Dressing"],
      status: "Preparing",
      time: "12:30 PM",
      total: 14.50,
      estimatedTime: "8 min"
    },
    {
      id: "VG-2024-002",
      customer: "Sarah Wilson",
      items: ["Asian Fusion Bowl", "Teriyaki Sauce"],
      status: "Ready",
      time: "12:25 PM",
      total: 13.25,
      estimatedTime: "Ready"
    },
    {
      id: "VG-2024-003",
      customer: "Mike Chen",
      items: ["Green Goddess Salad", "Balsamic Glaze"],
      status: "Validated",
      time: "12:35 PM",
      total: 12.75,
      estimatedTime: "12 min"
    },
    {
      id: "VG-2024-004",
      customer: "Emma Davis",
      items: ["Protein Power Pasta", "Pesto Sauce"],
      status: "Submitted",
      time: "12:40 PM",
      total: 15.00,
      estimatedTime: "15 min"
    },
    {
      id: "VG-2024-005",
      customer: "Tom Brown",
      items: ["Vegan Paradise Bowl", "Olive Oil Dressing"],
      status: "Preparing",
      time: "12:28 PM",
      total: 11.50,
      estimatedTime: "6 min"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800';
      case 'Validated':
        return 'bg-purple-100 text-purple-800';
      case 'Preparing':
        return 'bg-orange-100 text-orange-800';
      case 'Ready':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
    // Here you would update the order in your state management
  };

  const filteredOrders = orders.filter(order => {
    if (filter !== "all" && order.status.toLowerCase() !== filter) return false;
    if (searchTerm && !order.customer.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !order.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-vergreen-50 to-emerald-50 pb-20 md:pb-4">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-vergreen-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/dashboard')}
              className="text-vergreen-600 hover:text-vergreen-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-vergreen-800">Order Management</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-vergreen-500" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-white border-vergreen-200 rounded-xl focus:ring-vergreen-500"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40 bg-white border-vergreen-200 rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="validated">Validated</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Orders", value: orders.length, color: "text-blue-600" },
            { label: "In Queue", value: orders.filter(o => o.status === 'Submitted').length, color: "text-purple-600" },
            { label: "Preparing", value: orders.filter(o => o.status === 'Preparing').length, color: "text-orange-600" },
            { label: "Ready", value: orders.filter(o => o.status === 'Ready').length, color: "text-green-600" }
          ].map((stat, index) => (
            <Card key={index} className="bg-white rounded-3xl neumorphic p-4 text-center">
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-vergreen-600">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="bg-white rounded-3xl neumorphic p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-semibold text-vergreen-800">{order.id}</h3>
                    <p className="text-sm text-vergreen-600">{order.customer}</p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} border-0`}>
                    {order.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium text-vergreen-800">${order.total}</div>
                    <div className="text-sm text-vergreen-600">{order.time}</div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-vergreen-600">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Order Items */}
                <div className="lg:col-span-2">
                  <h4 className="font-medium text-vergreen-800 mb-2">Order Items</h4>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm text-vergreen-600">
                        • {item}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-vergreen-500" />
                    <span className="text-sm text-vergreen-700">ETA: {order.estimatedTime}</span>
                  </div>
                  
                  {order.status !== 'Ready' && (
                    <Select 
                      value={order.status} 
                      onValueChange={(newStatus) => updateOrderStatus(order.id, newStatus)}
                    >
                      <SelectTrigger className="w-full bg-vergreen-50 border-vergreen-200 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Submitted">Submitted</SelectItem>
                        <SelectItem value="Validated">Validated</SelectItem>
                        <SelectItem value="Preparing">Preparing</SelectItem>
                        <SelectItem value="Ready">Ready</SelectItem>
                      </SelectContent>
                    </Select>
                  )}

                  {order.status === 'Ready' && (
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl"
                      onClick={() => updateOrderStatus(order.id, 'Completed')}
                    >
                      Mark as Picked Up
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-vergreen-100 rounded-3xl mx-auto flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-vergreen-500" />
            </div>
            <h3 className="text-lg font-semibold text-vergreen-800 mb-2">
              No orders found
            </h3>
            <p className="text-vergreen-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <AdminNavbar />
    </div>
  );
};

export default OrderManagement;
