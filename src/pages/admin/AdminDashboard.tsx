
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Clock, 
  TrendingUp, 
  Package, 
  BarChart3, 
  Settings,
  Bell,
  LogOut,
  Leaf
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const kpis = [
    {
      title: "Total Orders Today",
      value: "47",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Average Prep Time",
      value: "14m",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Orders/Hour",
      value: "6.2",
      icon: Clock,
      color: "text-vergreen-600",
    },
  ];

  const quickActions = [
    {
      title: "Order Management",
      description: "Manage incoming orders and status",
      icon: Package,
      path: "/admin/orders",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: "Inventory",
      description: "Track ingredient stock levels",
      icon: BarChart3,
      path: "/admin/inventory",
      color: "bg-gradient-to-r from-vergreen-500 to-vergreen-600"
    },
    {
      title: "Analytics",
      description: "Sales and performance insights",
      icon: TrendingUp,
      path: "/admin/analytics",
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    }
  ];

  const recentOrders = [
    { id: "VG-001", time: "10:05", status: "Preparing", total: 12.5 },
    { id: "VG-002", time: "10:15", status: "Ready", total: 11.25 },
    { id: "VG-003", time: "10:25", status: "Validated", total: 10.75 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-vergreen-50 to-emerald-50 pb-20 md:pb-4">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-vergreen-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-vergreen-100 rounded-2xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-vergreen-600" />
            </div>
            <div>
              <h1 className="font-bold text-vergreen-800">VerGreen Admin</h1>
              <p className="text-xs text-vergreen-600">Restaurant Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-vergreen-600">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-vergreen-600">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin')} className="text-vergreen-600">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-3xl neumorphic p-6">
          <h2 className="text-xl font-bold text-vergreen-800 mb-2">
            Welcome back, Admin! 👨‍💼
          </h2>
          <p className="text-vergreen-600">
            Here's what's happening at VerGreen today
          </p>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpis.map((kpi, index) => (
            <Card key={index} className="bg-white rounded-3xl neumorphic p-6 text-center">
              <div className={`w-12 h-12 ${kpi.color} bg-opacity-10 rounded-2xl mx-auto mb-3 flex items-center justify-center`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div className="text-2xl font-bold text-vergreen-800 mb-1">
                {kpi.value}
              </div>
              <div className="text-sm text-vergreen-600 mb-1">
                {kpi.title}
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-vergreen-800">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="p-0 border-0 shadow-none bg-white rounded-3xl neumorphic overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
                onClick={() => navigate(action.path)}
              >
                <div className="p-6">
                  <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <action.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-semibold text-vergreen-800 mb-2">
                    {action.title}
                  </h4>
                  <p className="text-sm text-vergreen-600">
                    {action.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Today's Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white rounded-3xl neumorphic p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold text-vergreen-800 mb-4">
              Today's Orders
            </h3>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-vergreen-100 text-vergreen-600">
                  <th className="px-3 py-2 text-left font-medium">Order ID</th>
                  <th className="px-3 py-2 text-left font-medium">Time</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                  <th className="px-3 py-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vergreen-100">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-3 py-2 whitespace-nowrap">{order.id}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{order.time}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          order.status === 'Ready'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Preparing'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right">${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              variant="outline"
              className="w-full mt-4 border-vergreen-200 text-vergreen-700 hover:bg-vergreen-50 rounded-2xl"
              onClick={() => navigate('/admin/orders')}
            >
              View All Orders
            </Button>
          </Card>

          {/* Low Stock Alerts */}
          <Card className="bg-white rounded-3xl neumorphic p-6">
            <h3 className="text-lg font-semibold text-vergreen-800 mb-4">
              Low Stock Alerts
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-2xl">
                <div>
                  <div className="font-medium text-red-800">🥑 Avocado</div>
                  <div className="text-sm text-red-600">Only 3 portions left</div>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-xl">
                  Restock
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-2xl">
                <div>
                  <div className="font-medium text-yellow-800">🧀 Feta Cheese</div>
                  <div className="text-sm text-yellow-600">5 portions remaining</div>
                </div>
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl">
                  Restock
                </Button>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4 border-vergreen-200 text-vergreen-700 hover:bg-vergreen-50 rounded-2xl"
              onClick={() => navigate('/admin/inventory')}
            >
              Manage Inventory
            </Button>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
