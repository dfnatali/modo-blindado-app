import { User, Settings, HelpCircle, LogOut, ChevronRight, Crown } from "lucide-react";

const Perfil = () => {
  const menuItems = [
    { icon: Settings, label: "Configurações", description: "Notificações, privacidade" },
    { icon: Crown, label: "Modo Blindado Pro", description: "Recursos premium", highlight: true },
    { icon: HelpCircle, label: "Ajuda & Suporte", description: "FAQ, contato" },
    { icon: LogOut, label: "Sair da conta", description: "Desconectar dispositivo", danger: true },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Card */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">Usuário Blindado</h2>
            <p className="text-sm text-muted-foreground">usuario@email.com</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">127</p>
            <p className="text-xs text-muted-foreground">Verificações</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">98%</p>
            <p className="text-xs text-muted-foreground">Segurança</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">PRO</p>
            <p className="text-xs text-muted-foreground">Plano</p>
          </div>
        </div>
      </div>

      {/* Subscription Banner */}
      <div className="bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-2xl p-5 border border-primary/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/20">
            <Crown className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Modo Blindado Pro</h3>
            <p className="text-sm text-muted-foreground">Proteção máxima ativa</p>
          </div>
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            Ativo
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full bg-card rounded-xl p-4 border border-border flex items-center gap-4 hover:bg-surface-elevated transition-colors ${
              item.highlight ? "border-primary/30" : ""
            }`}
          >
            <div className={`p-3 rounded-xl ${
              item.highlight ? "bg-primary/10" : item.danger ? "bg-destructive/10" : "bg-secondary"
            }`}>
              <item.icon className={`w-5 h-5 ${
                item.highlight ? "text-primary" : item.danger ? "text-destructive" : "text-muted-foreground"
              }`} strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-left">
              <h4 className={`font-medium ${item.danger ? "text-destructive" : "text-foreground"}`}>
                {item.label}
              </h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
          </button>
        ))}
      </div>

      {/* Version */}
      <p className="text-center text-xs text-muted-foreground">
        Modo Blindado v1.0.0
      </p>
    </div>
  );
};

export default Perfil;
