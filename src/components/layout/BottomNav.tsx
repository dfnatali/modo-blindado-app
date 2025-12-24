import { MapPin, Shield, ScanLine, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { path: "/", label: "Radar", icon: MapPin },
  { path: "/blindagem", label: "Blindagem", icon: Shield },
  { path: "/scanner", label: "Scanner", icon: ScanLine },
  { path: "/perfil", label: "Perfil", icon: User },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2">
      <div className="glass rounded-2xl mx-auto max-w-md">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-item ${isActive ? "nav-item-active" : "nav-item-inactive"}`}
              >
                <div className={`relative ${isActive ? "glow-primary-sm rounded-full" : ""}`}>
                  <Icon 
                    className="w-6 h-6 transition-transform duration-200" 
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
