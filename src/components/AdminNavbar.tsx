
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Package, BarChart3, Settings } from "lucide-react";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: Package,
      label: "Orders",
      path: "/admin/orders",
    },
    {
      icon: BarChart3,
      label: "Inventory",
      path: "/admin/inventory",
    },
    {
      icon: Settings,
      label: "Analytics",
      path: "/admin/analytics",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-vergreen-100 px-4 py-2 z-10 md:hidden">
      <div className="max-w-md mx-auto">
        <nav className="flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
                  isActive
                    ? "text-vergreen-600"
                    : "text-gray-400 hover:text-vergreen-500"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive
                      ? "bg-vergreen-100"
                      : "hover:bg-vergreen-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default AdminNavbar;
