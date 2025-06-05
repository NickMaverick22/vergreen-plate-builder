
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, DollarSign, Users, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const Analytics = () => {
  const navigate = useNavigate();

  const revenueData = [
    { day: 'Mon', revenue: 480 },
    { day: 'Tue', revenue: 520 },
    { day: 'Wed', revenue: 450 },
    { day: 'Thu', revenue: 610 },
    { day: 'Fri', revenue: 720 },
    { day: 'Sat', revenue: 890 },
    { day: 'Sun', revenue: 650 }
  ];

  const popularIngredients = [
    { name: 'Quinoa', orders: 35, color: '#22c55e' },
    { name: 'Chicken', orders: 28, color: '#3b82f6' },
    { name: 'Avocado', orders: 25, color: '#f59e0b' },
    { name: 'Feta', orders: 22, color: '#8b5cf6' },
    { name: 'Salmon', orders: 18, color: '#ef4444' }
  ];

  const orderTrends = [
    { hour: '10:00', orders: 2 },
    { hour: '11:00', orders: 8 },
    { hour: '12:00', orders: 15 },
    { hour: '13:00', orders: 22 },
    { hour: '14:00', orders: 18 },
    { hour: '15:00', orders: 12 },
    { hour: '16:00', orders: 8 },
    { hour: '17:00', orders: 14 },
    { hour: '18:00', orders: 19 },
    { hour: '19:00', orders: 16 }
  ];

  const kpis = [
    {
      title: "Daily Revenue",
      value: "$720",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Total Orders",
      value: "47",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Avg Order Value",
      value: "$15.32",
      change: "+4.1%",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Avg Prep Time",
      value: "14m",
      change: "-2m",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

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
            <h1 className="text-xl font-bold text-vergreen-800">Sales & Analytics</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
              <div className={`text-xs font-medium ${
                kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change}
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Revenue */}
          <Card className="bg-white rounded-3xl neumorphic p-6">
            <h3 className="text-lg font-semibold text-vergreen-800 mb-4">
              Weekly Revenue
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Popular Ingredients */}
          <Card className="bg-white rounded-3xl neumorphic p-6">
            <h3 className="text-lg font-semibold text-vergreen-800 mb-4">
              Popular Ingredients
            </h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={popularIngredients}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="orders"
                  >
                    {popularIngredients.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {popularIngredients.map((ingredient, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: ingredient.color }}
                    />
                    <span className="text-vergreen-700">{ingredient.name}</span>
                  </div>
                  <span className="font-medium text-vergreen-800">
                    {ingredient.orders} orders
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Trends */}
          <Card className="bg-white rounded-3xl neumorphic p-6">
            <h3 className="text-lg font-semibold text-vergreen-800 mb-4">
              Hourly Order Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Insights */}
          <Card className="bg-white rounded-3xl neumorphic p-6">
            <h3 className="text-lg font-semibold text-vergreen-800 mb-4">
              Performance Insights
            </h3>
            <ul className="space-y-4">
              {[
                { 
                  title: "Peak Hours", 
                  description: "Highest order volume between 12-1pm and 6-7pm", 
                  icon: "⏰" 
                },
                { 
                  title: "Popular Combinations", 
                  description: "Quinoa + Chicken + Avocado is the top combo", 
                  icon: "🍽️" 
                },
                { 
                  title: "High Margin Items", 
                  description: "Add-on avocado has highest profit margin", 
                  icon: "💰" 
                },
                { 
                  title: "Customer Retention", 
                  description: "65% of customers return within 2 weeks", 
                  icon: "🔄" 
                }
              ].map((insight, index) => (
                <li key={index} className="flex items-start space-x-3 p-3 bg-vergreen-50 rounded-xl">
                  <div className="text-2xl flex-shrink-0">{insight.icon}</div>
                  <div>
                    <h4 className="font-medium text-vergreen-800">{insight.title}</h4>
                    <p className="text-sm text-vergreen-600">{insight.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Export Actions */}
        <div className="flex justify-end space-x-3">
          <Button 
            variant="outline" 
            className="border-vergreen-200 text-vergreen-700 hover:bg-vergreen-50 rounded-2xl"
          >
            Export CSV
          </Button>
          <Button 
            variant="outline"
            className="border-vergreen-200 text-vergreen-700 hover:bg-vergreen-50 rounded-2xl"
          >
            Print Report
          </Button>
        </div>
      </div>

    </div>
  );
};

export default Analytics;
