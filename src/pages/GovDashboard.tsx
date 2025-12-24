import { useState, useEffect } from 'react';
import { 
  Siren, 
  ShieldAlert, 
  Users, 
  MapPin, 
  Activity, 
  Radio, 
  Lock, 
  Database,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";

const GovDashboard = () => {
  // Simulação de dados em tempo real
  const [activeAlerts, setActiveAlerts] = useState(12);
  const [usersOnline, setUsersOnline] = useState(14502);
  
  // Efeito de números subindo (Simulação de vida)
  useEffect(() => {
    const interval = setInterval(() => {
      setUsersOnline(prev => prev + Math.floor(Math.random() * 5));
      if (Math.random() > 0.7) setActiveAlerts(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const recentIncidents = [
    { id: 1, loc: "Av. Paulista, 1578", type: "Arrastão Detectado", time: "Agora", severity: "high" },
    { id: 2, loc: "Rua Augusta, 500", type: "Movimento Suspeito", time: "2 min", severity: "medium" },
    { id: 3, loc: "Marginal Pinheiros", type: "Rota de Fuga (Bloqueio)", time: "5 min", severity: "critical" },
    { id: 4, loc: "Metrô Sé", type: "Furto de Celular", time: "12 min", severity: "low" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono overflow-hidden flex flex-col">
      
      {/* BARRA DE COMANDO SUPERIOR */}
      <div className="border-b border-slate-800 bg-slate-900/90 p-4 flex justify-between items-center shadow-2xl z-50">
        <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-slate-800 rounded flex items-center justify-center border border-slate-700">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Brasao_do_estado_de_Sao_Paulo.svg/1200px-Brasao_do_estado_de_Sao_Paulo.svg.png" className="h-6 w-6 opacity-80" alt="SP" />
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-widest text-white">SSP-SP // MURALHA DIGITAL</h1>
                <p className="text-[10px] text-emerald-500 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    CONEXÃO SEGURA: MODO BLINDADO API V1
                </p>
            </div>
        </div>

        <div className="flex gap-6">
            <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase">Cidadãos Monitorados</p>
                <p className="text-2xl font-bold text-white tabular-nums">{usersOnline.toLocaleString()}</p>
            </div>
            <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase">Ameaças Ativas</p>
                <p className="text-2xl font-bold text-red-500 tabular-nums animate-pulse">{activeAlerts}</p>
            </div>
            <div className="h-10 w-px bg-slate-800"></div>
            <div className="flex items-center">
                 <Button variant="outline" className="border-red-900 bg-red-950/30 text-red-500 hover:bg-red-900 hover:text-white">
                    <Siren className="mr-2 w-4 h-4 animate-bounce" />
                    ACIONAR PROTOCOLO GERAL
                 </Button>
            </div>
        </div>
      </div>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR ESQUERDA - LISTA DE INTELIGÊNCIA */}
        <div className="w-80 border-r border-slate-800 bg-slate-900/50 backdrop-blur p-4 overflow-y-auto">
            <h3 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
                <Radio className="w-4 h-4 text-blue-500" /> Feed Tático
            </h3>
            <div className="space-y-3">
                {recentIncidents.map((incident) => (
                    <div key={incident.id} className="bg-slate-950/50 p-3 rounded border-l-2 border-l-transparent hover:border-l-blue-500 transition-all border border-slate-800 cursor-pointer group">
                        <div className="flex justify-between items-start mb-1">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                incident.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                                incident.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                'bg-blue-500/20 text-blue-400'
                            }`}>
                                {incident.severity}
                            </span>
                            <span className="text-[10px] text-slate-500">{incident.time}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{incident.type}</h4>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {incident.loc}
                        </p>
                    </div>
                ))}
                {/* Items Fakes de preenchimento */}
                {[...Array(5)].map((_, i) => (
                     <div key={i + 10} className="bg-slate-950/30 p-3 rounded border border-slate-800 opacity-50">
                        <div className="h-2 w-16 bg-slate-800 rounded mb-2"></div>
                        <div className="h-3 w-32 bg-slate-800 rounded mb-1"></div>
                        <div className="h-2 w-24 bg-slate-800 rounded"></div>
                     </div>
                ))}
            </div>
        </div>

        {/* MAPA CENTRAL (Simulado com CSS para parecer War Room) */}
        <div className="flex-1 relative bg-slate-950 overflow-hidden">
            {/* Grid de Fundo */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ 
                     backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', 
                     backgroundSize: '40px 40px' 
                 }}>
            </div>
            
            {/* Manchas de Calor (Simulando o Mapa) */}
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]"></div>

            {/* Marcadores no Mapa */}
            <div className="absolute top-[30%] left-[40%]">
                <div className="relative">
                    <div className="absolute -inset-4 bg-red-500/30 rounded-full animate-ping"></div>
                    <ShieldAlert className="w-8 h-8 text-red-500 relative z-10" />
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/80 text-red-500 text-[10px] px-2 py-1 rounded border border-red-900 whitespace-nowrap">
                        ALERTA MÁXIMO
                    </div>
                </div>
            </div>

            <div className="absolute bottom-[40%] right-[30%] opacity-70">
                 <Users className="w-6 h-6 text-blue-500" />
            </div>

            {/* Painel Flutuante de Estatísticas */}
            <div className="absolute bottom-6 right-6 bg-slate-900/90 border border-slate-700 p-4 rounded-xl shadow-2xl w-80 backdrop-blur">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4" /> Inteligência Preditiva
                </h4>
                <div className="space-y-3">
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300">Crimes Prevenidos (Hoje)</span>
                            <span className="text-emerald-400 font-bold">84</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[70%]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300">Precisão do Algoritmo</span>
                            <span className="text-blue-400 font-bold">94.2%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[94%]"></div>
                        </div>
                    </div>
                    
                    <div className="pt-2 border-t border-slate-800 mt-2">
                        <p className="text-[10px] text-slate-500 leading-tight">
                            *Dados baseados na geolocalização de 14.5k usuários ativos. O sistema aprende padrões de evasão de rota.
                        </p>
                    </div>
                </div>
            </div>

            {/* Barra de Pesquisa Flutuante */}
            <div className="absolute top-6 left-6 right-6 max-w-xl mx-auto">
                <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-2 flex items-center gap-3 shadow-xl backdrop-blur">
                    <Search className="w-5 h-5 text-slate-500 ml-2" />
                    <input 
                        type="text" 
                        placeholder="Buscar Placa, CPF ou Ocorrência..." 
                        className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-slate-600"
                    />
                    <div className="flex gap-1 pr-2">
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">CMD+K</span>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default GovDashboard;