
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, AlertTriangle, Plus, Minus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const InventoryManagement = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState({
    base: [
      { id: 'rice', name: 'Rice', stock: 20, minStock: 10, icon: '🍚' },
      { id: 'quinoa', name: 'Quinoa', stock: 15, minStock: 10, icon: '🌾' },
      { id: 'pasta', name: 'Pasta', stock: 18, minStock: 8, icon: '🍝' }
    ],
    proteins: [
      { id: 'chicken', name: 'Chicken', stock: 12, minStock: 10, icon: '🍗' },
      { id: 'tuna', name: 'Tuna', stock: 9, minStock: 8, icon: '🐟' },
      { id: 'shrimp', name: 'Shrimp', stock: 6, minStock: 6, icon: '🦐' }
    ],
    veggies: [
      { id: 'spinach', name: 'Spinach', stock: 22, minStock: 15, icon: '🥬' },
      { id: 'carrots', name: 'Carrots', stock: 16, minStock: 12, icon: '🥕' },
      { id: 'tomatoes', name: 'Tomatoes', stock: 5, minStock: 10, icon: '🍅' }
    ],
    cheese: [
      { id: 'mozz', name: 'Mozzarella', stock: 8, minStock: 6, icon: '🧀' },
      { id: 'sicilian', name: 'Sicilian', stock: 4, minStock: 6, icon: '🧀' }
    ],
    sauces: [
      { id: 'pesto', name: 'Pesto', stock: 10, minStock: 8, icon: '🫙' },
      { id: 'tomato', name: 'Tomato', stock: 14, minStock: 10, icon: '🍅' },
      { id: 'caesar', name: 'Caesar', stock: 6, minStock: 6, icon: '🥣' }
    ]
  });

  const getStockStatus = (current, minimum) => {
    if (current === 0) return { status: 'out', color: 'bg-red-500 text-white', label: 'Out of Stock' };
    if (current <= minimum * 0.5) return { status: 'critical', color: 'bg-red-100 text-red-800', label: 'Critical' };
    if (current <= minimum) return { status: 'low', color: 'bg-yellow-100 text-yellow-800', label: 'Low Stock' };
    return { status: 'good', color: 'bg-green-100 text-green-800', label: 'In Stock' };
  };

  const updateStock = (category, itemId, change) => {
    setInventory(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === itemId
          ? { ...item, stock: Math.max(0, item.stock + change) }
          : item
      )
    }));
  };

  const restockItem = (category, itemId) => {
    setInventory(prev => ({
      ...prev,
      [category]: prev[category].map(item =>
        item.id === itemId
          ? { ...item, stock: item.minStock * 2 }
          : item
      )
    }));
    
    toast({
      title: "Item restocked",
      description: "Stock levels have been updated",
    });
  };

  const getTotalLowStockItems = () => {
    let count = 0;
    Object.values(inventory).forEach(category => {
      category.forEach(item => {
        if (item.stock <= item.minStock) count++;
      });
    });
    return count;
  };

  const renderCategory = (categoryName, items) => (
    <Card key={categoryName} className="bg-white rounded-3xl neumorphic p-6">
      <h3 className="text-lg font-semibold text-vergreen-800 mb-4 capitalize">
        {categoryName}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const stockStatus = getStockStatus(item.stock, item.minStock);
          return (
            <div key={item.id} className="bg-vergreen-50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-medium text-vergreen-800">{item.name}</h4>
                    <p className="text-sm text-vergreen-600">Min: {item.minStock} portions</p>
                  </div>
                </div>
                <Badge className={`${stockStatus.color} border-0`}>
                  {stockStatus.label}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStock(categoryName, item.id, -1)}
                    disabled={item.stock === 0}
                    className="w-8 h-8 p-0 border-vergreen-200 hover:bg-vergreen-100 rounded-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-lg font-semibold text-vergreen-800 w-8 text-center">
                    {item.stock}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStock(categoryName, item.id, 1)}
                    className="w-8 h-8 p-0 border-vergreen-200 hover:bg-vergreen-100 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {item.stock <= item.minStock && (
                  <Button
                    size="sm"
                    onClick={() => restockItem(categoryName, item.id)}
                    className="bg-vergreen-600 hover:bg-vergreen-700 text-white rounded-xl"
                  >
                    Restock
                  </Button>
                )}
              </div>

              {/* Stock level indicator */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    stockStatus.status === 'critical' || stockStatus.status === 'out'
                      ? 'bg-red-500'
                      : stockStatus.status === 'low'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{
                    width: `${Math.min(100, (item.stock / (item.minStock * 2)) * 100)}%`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );

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
            <h1 className="text-xl font-bold text-vergreen-800">Inventory Management</h1>
          </div>
          <div className="flex items-center space-x-2">
            {getTotalLowStockItems() > 0 && (
              <div className="flex items-center space-x-2 bg-red-100 text-red-800 px-3 py-1 rounded-full">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {getTotalLowStockItems()} items need attention
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(inventory).map(([category, items]) => {
            const totalItems = items.length;
            const lowStockItems = items.filter(item => item.stock <= item.minStock).length;
            const outOfStockItems = items.filter(item => item.stock === 0).length;
            
            return (
              <Card key={category} className="bg-white rounded-3xl neumorphic p-4 text-center">
                <div className="w-12 h-12 bg-vergreen-100 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                  <Package className="w-6 h-6 text-vergreen-600" />
                </div>
                <div className="text-xl font-bold text-vergreen-800 mb-1 capitalize">
                  {category}
                </div>
                <div className="text-sm text-vergreen-600 mb-2">
                  {totalItems} items total
                </div>
                {lowStockItems > 0 && (
                  <div className="text-xs text-red-600">
                    {outOfStockItems > 0 && `${outOfStockItems} out of stock`}
                    {outOfStockItems > 0 && lowStockItems > outOfStockItems && ', '}
                    {lowStockItems > outOfStockItems && `${lowStockItems - outOfStockItems} low stock`}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Inventory Categories */}
        <div className="space-y-6">
          {Object.entries(inventory).map(([category, items]) => 
            renderCategory(category, items)
          )}
        </div>
      </div>

    </div>
  );
};

export default InventoryManagement;
