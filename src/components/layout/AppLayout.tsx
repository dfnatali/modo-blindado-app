// ARQUIVO: src/components/layout/AppLayout.tsx
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, MapPin, Shield, User, ScanLine } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // CONFIGURAÇÃO DOS ÍCONES (Aqui garantimos o MapPin)
  const navItems = [
    { icon: Home, label: "Início", path: "/" },
    // ATENÇÃO: MapPin é o pino/balão de localização. Map é o mapa de papel.
    { icon: MapPin, label: "Radar", path: "/radar" }, 
    { icon: Shield, label: "Blindagem", path: "/blindagem" },
    { icon: ScanLine, label: "Scanner", path: "/scanner" },
    { icon: User, label: "Perfil", path: "/perfil" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-slate-50 pb-20">
      
      {/* Área de Conteúdo */}
      <main className="container mx-auto px-4 py-4 animate-in fade-in duration-500">
        {children}
      </main>

      {/* BARRA DE NAVEGAÇÃO INTEGRADA (Sem dependência de BottomNav) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800 z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "text-blue-500 -translate-y-1" 
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                }`}
              >
                {/* Ponto indicador de ativo */}
                {isActive && (
                  <span className="absolute -top-1 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
                )}
                
                <Icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={`transition-transform duration-300 ${isActive ? "scale-110" : "scale-100"}`}
                />
                
                <span className={`text-[10px] mt-1 font-medium transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0 hidden"
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;