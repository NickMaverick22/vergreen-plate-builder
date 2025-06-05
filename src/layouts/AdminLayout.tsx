import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "@/components/AdminNavbar";
import { AdminProvider } from "@/contexts/AdminDataContext";
import {
  Home,
  Package,
  BarChart3,
  PieChart,
  LogOut,
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const navItems = [
    { label: "Dashboard", icon: Home, path: "/admin/dashboard" },
    { label: "Orders", icon: Package, path: "/admin/orders" },
    { label: "Inventory", icon: BarChart3, path: "/admin/inventory" },
    { label: "Analytics", icon: PieChart, path: "/admin/analytics" },
  ];

  return (
    <AdminProvider>
      <div className="min-h-screen flex bg-vergreen-50">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-56 p-4 bg-white border-r border-vergreen-100">
        <div className="mb-8 px-2 text-xl font-bold text-vergreen-700">VerGreen</div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium hover:bg-vergreen-100 ${
                    isActive ? "bg-vergreen-100 text-vergreen-700" : "text-gray-600"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <button
          onClick={() => navigate("/admin/login")}
          className="mt-auto flex items-center space-x-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </aside>

      <div className="flex-1 min-h-screen flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        <AdminNavbar />
      </div>
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;
