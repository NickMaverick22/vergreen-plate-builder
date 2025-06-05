
import { useNavigate, useLocation } from "react-router-dom";
import { Home, FastForward, History, User } from "lucide-react";

const CustomerNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/dashboard",
    },
    {
      icon: FastForward,
      label: "Order",
      path: "/plate-builder",
    },
    {
      icon: History,
      label: "History",
      path: "/history",
    },
    {
      icon: User,
      label: "Profile",
      path: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-vergreen-100 px-4 py-2 z-20 shadow-lg">
      <div className="max-w-md mx-auto">
        <nav className="flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 ${
                  isActive
                    ? "text-white bg-vergreen-600 shadow-lg"
                    : "text-gray-400 hover:text-vergreen-500 hover:bg-vergreen-50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-transparent"
                      : "hover:bg-vergreen-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs mt-1 font-medium ${
                  isActive ? "text-white" : ""
                }`}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default CustomerNavbar;
