import { 
  Wifi, 
  MessageSquare, 
  ShieldAlert, 
  Lock, 
  Smartphone, 
  Ghost, 
  Bluetooth, 
  Fingerprint 
} from "lucide-react";
import { toast } from "sonner";
// IMPORTANTE: Se der erro de caminho, verifique se é ../context ou @/context
import { useSecurity } from "../context/SecurityContext"; 

const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (v: boolean) => void }) => (
  <button
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${checked ? "bg-emerald-500" : "bg-zinc-700"}`}
  >
    <span className={`${checked ? "translate-x-6" : "translate-x-1"} inline-block h-5 w-5 transform rounded-full bg-white transition-transform`} />
  </button>
);

const Blindagem = () => {
  // CONEXÃO COM O CONTEXTO
  const { toggles, toggleProtection } = useSecurity();

  const handleToggle = (id: string, label: string) => {
    toggleProtection(id);
    if (!toggles[id]) {
      toast.success(`${label} ATIVADO`, { 
        className: "bg-emerald-950 border-emerald-800 text-emerald-400 font-bold" 
      });
    }
  };

  // IDs DEVEM BATER COM O SECURITYCONTEXT
  const modules = [
    { id: 'networkGuard', icon: Wifi, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Proteção Wi-Fi', desc: 'Monitora redes clonadas.' },
    { id: 'smsShield', icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-500/10', label: 'Escudo SMS', desc: 'Bloqueia leitura de OTP.' },
    { id: 'vpn', icon: ShieldAlert, color: 'text-purple-500', bg: 'bg-purple-500/10', label: 'VPN Blindada', desc: 'Túnel criptografado.' },
    { id: 'antivirus', icon: Lock, color: 'text-red-500', bg: 'bg-red-500/10', label: 'Sentinela IA', desc: 'Antivírus comportamental.' },
    { id: 'remoteLock', icon: Smartphone, color: 'text-orange-500', bg: 'bg-orange-500/10', label: 'Kill Switch', desc: 'Trava remota total.' },
    { id: 'ghostVault', icon: Ghost, color: 'text-slate-400', bg: 'bg-slate-500/10', label: 'Ghost Vault', desc: 'Partição invisível.' },
    { id: 'tagTether', icon: Bluetooth, color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'Tag Tethering', desc: 'Alerta de desconexão.' },
    { id: 'biometrics', icon: Fingerprint, color: 'text-cyan-500', bg: 'bg-cyan-500/10', label: 'Biometria', desc: 'Exige FaceID crítico.' },
  ];

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-5 pb-24">
      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 mb-6 backdrop-blur-sm">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-500" />
          Arsenal de Defesa
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Ative os módulos para aumentar seu nível de blindagem.
        </p>
      </div>

      <div className="grid gap-3">
        {modules.map((mod) => (
          <div 
            key={mod.id} 
            className={`rounded-xl p-4 border transition-all duration-300 flex items-center justify-between ${toggles[mod.id] ? 'bg-slate-900 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-zinc-900/50 border-zinc-800'}`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${mod.bg} ${mod.color}`}>
                <mod.icon className="w-6 h-6"/>
              </div>
              <div>
                <h4 className={`font-bold text-sm ${toggles[mod.id] ? 'text-white' : 'text-zinc-400'}`}>
                  {mod.label}
                </h4>
                <p className="text-[10px] text-zinc-500 leading-tight max-w-[180px]">
                  {mod.desc}
                </p>
              </div>
            </div>
            
            <Switch 
              checked={!!toggles[mod.id]} 
              onCheckedChange={() => handleToggle(mod.id, mod.label)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blindagem;