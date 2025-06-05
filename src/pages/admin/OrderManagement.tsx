
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const OrderManagement = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    {
      id: "VG-2024-001",
      customer: "Alex Johnson",
      status: "Preparing",
      date: "2025-06-05",
      time: "12:30",
      total: 14.5,
    },
    {
      id: "VG-2024-002",
      customer: "Sarah Wilson",
      status: "Ready",
      date: "2025-06-05",
      time: "12:25",
      total: 13.25,
    },
    {
      id: "VG-2024-003",
      customer: "Mike Chen",
      status: "Validated",
      date: "2025-06-05",
      time: "12:35",
      total: 12.75,
    },
    {
      id: "VG-2024-004",
      customer: "Emma Davis",
      status: "Submitted",
      date: "2025-06-05",
      time: "12:40",
      total: 15,
    },
    {
      id: "VG-2024-005",
      customer: "Tom Brown",
      status: "Preparing",
      date: "2025-06-05",
      time: "12:28",
      total: 11.5,
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

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== "all" && order.status.toLowerCase() !== statusFilter) {
      return false;
    }
    if (dateFilter && order.date !== dateFilter) {
      return false;
    }
    if (
      searchTerm &&
      !order.customer.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !order.id.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
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
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-vergreen-500" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-white border-vergreen-200 rounded-xl focus:ring-vergreen-500"
              />
            </div>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-white border-vergreen-200 rounded-xl px-3 py-2"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-white border-vergreen-200 rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
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

        {/* Orders Table */}
        <Card className="bg-white rounded-3xl neumorphic p-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-vergreen-100 text-vergreen-600">
                <th className="px-3 py-2 text-left font-medium">Order ID</th>
                <th className="px-3 py-2 text-left font-medium">Customer</th>
                <th className="px-3 py-2 text-left font-medium">Date</th>
                <th className="px-3 py-2 text-left font-medium">Time</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 text-right font-medium">Total</th>
                <th className="px-3 py-2 font-medium">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-vergreen-100">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-3 py-2 whitespace-nowrap">{order.id}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{order.customer}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{order.date}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{order.time}</td>
                  <td className="px-3 py-2">
                    <Badge className={`${getStatusColor(order.status)} border-0`}>{order.status}</Badge>
                  </td>
                  <td className="px-3 py-2 text-right">${order.total.toFixed(2)}</td>
                  <td className="px-3 py-2">
                    <Select
                      value={order.status}
                      onValueChange={(newStatus) => updateOrderStatus(order.id, newStatus)}
                    >
                      <SelectTrigger className="w-32 bg-vergreen-50 border-vergreen-200 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Submitted">Submitted</SelectItem>
                        <SelectItem value="Validated">Validated</SelectItem>
                        <SelectItem value="Preparing">Preparing</SelectItem>
                        <SelectItem value="Ready">Ready</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

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

    </div>
  );
};

export default OrderManagement;
