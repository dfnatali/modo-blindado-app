import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 py-4 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border">
      <h1 className="text-xl font-semibold tracking-tight">
        <span className="text-foreground">Modo</span>
        <span className="text-primary ml-1">Blindado</span>
      </h1>
      
      <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
        <Bell className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
      </button>
    </header>
  );
};

export default Header;
