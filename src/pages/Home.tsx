import { 
  ShieldCheck, 
  Map, 
  ScanLine, 
  Zap, 
  Activity, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// IMPORTANTE: Verifique se o caminho do contexto está correto
import { useSecurity } from "../context/SecurityContext";

const Home = () => {
  const navigate = useNavigate();
  // Conexão com o Contexto
  const { securityPercentage, activeCount } = useSecurity();

  // Cores dinâmicas
  const getStatusColor = () => {
    if (securityPercentage < 50) return {
      text: "text-red-500",
      bg: "bg-red-500",
      border: "border-red-500/30",
      shadow: "shadow-red-500/20"
    };
    if (securityPercentage < 90) return {
      text: "text-amber-500",
      bg: "bg-amber-500",
      border: "border-amber-500/30",
      shadow: "shadow-amber-500/20"
    };
    return {
      text: "text-emerald-500",
      bg: "bg-emerald-500",
      border: "border-emerald-500/30",
      shadow: "shadow-emerald-500/20"
    };
  };

  const status = getStatusColor();

  const handlePanic = () => {
    toast.error("🚨 PROTOCOLO DE PÂNICO ACIONADO", {
      description: "Enviando localização e áudio ambiente...",
      className: "bg-red-950 border-red-800 text-white font-bold animate-pulse"
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-24">
      
      {/* CABEÇALHO */}
      <div className="flex justify-between items-center pt-2">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Olá, Coronel</h1>
          <p className="text-xs text-slate-400 flex items-center gap-2 font-mono">
            SISTEMA: <span className="text-emerald-500 animate-pulse font-bold">ONLINE</span>
          </p>
        </div>
        <div className="h-10 w-10 bg-emerald-500/10 rounded-full flex items-center justify-center animate-pulse border border-emerald-500/20">
          <Activity className="h-5 w-5 text-emerald-500" />
        </div>
      </div>

      {/* CARD PRINCIPAL */}
      <div 
        onClick={() => navigate('/blindagem')}
        className={`bg-slate-900/80 rounded-2xl p-6 border ${status.border} shadow-lg relative overflow-hidden cursor-pointer group transition-all duration-500 hover:scale-[1.02]`}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
           <div 
             className={`h-full transition-all duration-1000 ease-out ${status.bg}`} 
             style={{ width: `${securityPercentage}%` }} 
           />
        </div>

        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Nível de Blindagem</p>
            <h2 className={`text-5xl font-black mt-2 font-mono ${status.text}`}>
              {securityPercentage}%
            </h2>
          </div>
          <div className={`p-3 rounded-xl bg-slate-950/50 border border-slate-800 ${status.text}`}>
             {securityPercentage === 100 ? <CheckCircle className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
           <span className="bg-slate-800 px-2 py-1 rounded text-slate-200 border border-slate-700">
             {activeCount} / 8
           </span>
           <span>Módulos Ativos</span>
           <ChevronRight className="w-4 h-4 ml-auto text-slate-600 group-hover:translate-x-1 transition-transform group-hover:text-white" />
        </div>
      </div>

      {/* GRID DE AÇÕES */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => navigate('/radar')}
          className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 hover:bg-slate-800/80 hover:border-blue-500/50 transition-all flex flex-col items-center text-center gap-3 group"
        >
          <div className="p-3 bg-blue-500/10 w-fit rounded-xl text-blue-500 group-hover:scale-110 transition-transform duration-300 ring-1 ring-blue-500/20">
            <Map className="w-6 h-6" />
          </div>
          <div className="text-left w-full">
            <span className="font-bold text-slate-200 block">Radar</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Rotas Seguras</span>
          </div>
        </button>

        <button 
          onClick={() => navigate('/scanner')}
          className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 hover:bg-slate-800/80 hover:border-purple-500/50 transition-all flex flex-col items-center text-center gap-3 group"
        >
          <div className="p-3 bg-purple-500/10 w-fit rounded-xl text-purple-500 group-hover:scale-110 transition-transform duration-300 ring-1 ring-purple-500/20">
            <ScanLine className="w-6 h-6" />
          </div>
          <div className="text-left w-full">
            <span className="font-bold text-slate-200 block">Scanner</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">IA Detector</span>
          </div>
        </button>
      </div>

      {/* BOTÃO DE PÂNICO */}
      <div className="relative group">
        <div className="absolute inset-0 bg-red-600/20 blur-xl rounded-xl animate-pulse group-hover:bg-red-600/30 transition-all"></div>
        <Button 
          variant="destructive" 
          className="w-full h-20 text-xl font-black rounded-xl border border-red-500/50 bg-red-950/80 hover:bg-red-900 relative z-10 shadow-2xl overflow-hidden"
          onClick={handlePanic}
        >
          <div className="flex flex-col items-center gap-1 z-10">
            <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 fill-current animate-bounce" />
                <span>ACIONAR PÂNICO</span>
            </div>
            <span className="text-[10px] font-normal opacity-80 tracking-[0.2em] text-red-200">SOS SILENCIOSO</span>
          </div>
        </Button>
      </div>

      {/* FEED DE ALERTAS */}
      <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          <h4 className="font-bold text-sm text-slate-300 uppercase tracking-wider">Inteligência Regional</h4>
        </div>
        <div className="space-y-3">
           <div className="flex items-start gap-3 text-xs text-slate-400 bg-black/20 p-3 rounded-lg border border-slate-800/50">
              <span className="relative flex h-2 w-2 mt-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>
                <strong className="text-slate-200 block mb-1">Arrastão detectado</strong>
                Via Expressa, sentido Zona Sul (2km de você). Evite a área.
              </span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;