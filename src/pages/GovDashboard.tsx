import { useState, useEffect } from 'react';
import { 
  Siren, 
  ShieldAlert, 
  Users, 
  MapPin, 
  Database,
  Search,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const GovDashboard = () => {
  // Simulação de dados em tempo real
  const [activeAlerts, setActiveAlerts] = useState(12);
  const [usersOnline, setUsersOnline] = useState(14502);
  
  // Efeito de números subindo
  useEffect(() => {
    const interval = setInterval(() => {
      setUsersOnline(prev => prev + Math.floor(Math.random() * 5));
      if (Math.random() > 0.7) setActiveAlerts(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // DADOS TÁTICOS
  const recentIncidents = [
    { id: 1, loc: "Av. Paulista, 1578", type: "Arrastão Detectado (Modo Pânico Ativo)", time: "Agora", severity: "critical" },
    { id: 2, loc: "Rua Augusta, 500", type: "Movimento Suspeito (Padrão de Gangue)", time: "2 min", severity: "high" },
    { id: 3, loc: "Marginal Pinheiros, Pte. Estaiada", type: "Rota de Fuga Identificada", time: "5 min", severity: "critical" },
    { id: 4, loc: "Metrô Sé (Entorno)", type: "Furto de Celular (Múltiplos Reports)", time: "8 min", severity: "medium" },
    { id: 5, loc: "Av. Brigadeiro Faria Lima, 3400", type: "Tentativa de Sequestro Relâmpago", time: "12 min", severity: "high" },
    { id: 6, loc: "Rodovia dos Imigrantes, Km 15", type: "Veículo Clonado Detectado pelo Scanner", time: "15 min", severity: "medium" },
    { id: 7, loc: "Bairro Capão Redondo", type: "Disparo de Arma de Fogo (Áudio Detectado)", time: "18 min", severity: "critical" },
    { id: 8, loc: "Shopping Center Norte", type: "Alerta de Golpe do PIX (QR Code Falso)", time: "22 min", severity: "low" },
    { id: 9, loc: "Aeroporto de Congonhas", type: "Desvio de Rota de Táxi (Alerta Preventivo)", time: "25 min", severity: "medium" },
    { id: 10, loc: "Parque Ibirapuera (Portão 3)", type: "Atividade Suspeita Noturna", time: "30 min", severity: "low" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-hidden flex flex-col">
      
      {/* BARRA DE COMANDO SUPERIOR */}
      <div className="border-b border-slate-800 bg-slate-900/95 p-4 flex justify-between items-center shadow-2xl z-50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
            <img 
              src="/ssp-digital.jpeg" 
              alt="SSP Digital Logo" 
              className="h-14 w-14 object-contain drop-shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:scale-105 transition-transform rounded-lg"
            />
            <div>
                <h1 className="text-xl font-black tracking-widest text-white uppercase">SSP DIGITAL // COMANDO SP</h1>
                <p className="text-[10px] text-emerald-500 flex items-center gap-2 font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    INTEGRAÇÃO: MODO BLINDADO CIDADÃO V1.2
                </p>
            </div>
        </div>

        <div className="flex gap-8 items-center">
            <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Cidadãos na Rede</p>
                <p className="text-3xl font-black text-white tabular-nums">{usersOnline.toLocaleString()}</p>
            </div>
            <div className="text-right relative">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Alertas Críticos</p>
                <p className="text-3xl font-black text-red-500 tabular-nums animate-pulse">{activeAlerts}</p>
                <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full -z-10 animate-pulse"></div>
            </div>
            <div className="h-12 w-px bg-slate-800/50"></div>
            <div className="flex items-center">
                 <Button variant="destructive" className="bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/20 font-bold tracking-wider py-6">
                    <Siren className="mr-3 w-5 h-5 animate-[spin_3s_linear_infinite]" />
                    ACIONAR PROTOCOLO DE CRISE
                 </Button>
            </div>
        </div>
      </div>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* SIDEBAR ESQUERDA */}
        <div className="w-96 border-r border-slate-800 bg-slate-900/80 backdrop-blur-md p-4 overflow-y-auto z-20 relative shadow-2xl">
            <h3 className="text-xs font-black text-blue-400 mb-6 flex items-center gap-2 uppercase tracking-[0.2em] border-b border-blue-900/30 pb-3">
                <Radio className="w-4 h-4" /> Feed Tático em Tempo Real
            </h3>
            <div className="space-y-4">
                {recentIncidents.map((incident) => (
                    <div key={incident.id} className="bg-slate-950/80 p-4 rounded-lg border-l-[3px] border-l-transparent hover:border-l-blue-500 transition-all border border-slate-800/50 cursor-pointer group hover:bg-slate-900 hover:shadow-lg hover:shadow-blue-900/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <span className={`text-[9px] px-2 py-0.5 rounded-sm font-black uppercase tracking-wider ${
                                incident.severity === 'critical' ? 'bg-red-500 text-white shadow-sm shadow-red-500/50' :
                                incident.severity === 'high' ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/50' :
                                incident.severity === 'medium' ? 'bg-yellow-500 text-black shadow-sm shadow-yellow-500/50' :
                                'bg-blue-500 text-white shadow-sm shadow-blue-500/50'
                            }`}>
                                {incident.severity}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">{incident.time}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-100 group-hover:text-blue-300 transition-colors leading-tight relative z-10">{incident.type}</h4>
                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5 relative z-10 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-slate-600" /> {incident.loc}
                        </p>
                    </div>
                ))}
            </div>
        </div>

        {/* MAPA CENTRAL (ATUALIZADO E VISÍVEL) */}
        <div className="flex-1 relative bg-slate-950 overflow-hidden">
            
            {/* 1. CAMADA DO MAPA (Sem blend modes complexos, apenas escurecido) */}
            <div className="absolute inset-0 z-0" 
                 style={{ 
                     backgroundImage: 'url(/map-bg.jpg)', // <--- Puxa o arquivo local
                     backgroundSize: 'cover',
                     backgroundPosition: 'center center',
                     filter: 'brightness(0.5) contrast(1.1)' // Escurece levemente para destacar os ícones, mas mantém visível
                 }}>
            </div>
            
            {/* 2. GRID CIBERNÉTICO (Overlay suave) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none z-0" 
                 style={{ 
                     backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', 
                     backgroundSize: '80px 80px' 
                 }}>
            </div>

            {/* Manchas de Calor */}
            <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] animate-pulse -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen"></div>

            {/* Marcadores */}
            <div className="absolute top-[45%] left-[55%] z-10">
                <div className="relative group cursor-pointer">
                    <div className="absolute -inset-8 bg-red-500/20 rounded-full animate-ping"></div>
                    <ShieldAlert className="w-12 h-12 text-red-500 relative drop-shadow-[0_0_10px_rgba(239,68,68,1)]" />
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-red-950/90 text-red-100 text-[10px] px-3 py-1.5 rounded border border-red-500/50 whitespace-nowrap font-bold tracking-wider backdrop-blur-md shadow-xl">
                        ZONA DE CONFLITO
                    </div>
                </div>
            </div>

            <div className="absolute bottom-[35%] right-[25%] opacity-90 z-10">
                 <div className="relative">
                    <Users className="w-8 h-8 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,1)]" />
                 </div>
            </div>

            {/* Painel Estatísticas */}
            <div className="absolute bottom-8 right-8 bg-slate-900/90 border border-slate-700/50 p-5 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] w-96 backdrop-blur-lg z-30">
                <h4 className="text-xs font-black text-blue-400 uppercase mb-4 flex items-center gap-2 tracking-wider">
                    <Database className="w-4 h-4" /> Inteligência Preditiva da IA
                </h4>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs mb-1.5 font-bold">
                            <span className="text-slate-300">Crimes Prevenidos</span>
                            <span className="text-emerald-400 text-sm">142</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden relative">
                             <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 w-[82%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1.5 font-bold">
                            <span className="text-slate-300">Confiabilidade</span>
                            <span className="text-blue-400 text-sm">96.8%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden relative">
                            <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[96.8%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barra de Pesquisa */}
            <div className="absolute top-8 left-8 right-8 max-w-2xl mx-auto z-30">
                <div className="bg-slate-900/80 border border-slate-700/50 rounded-lg p-2.5 flex items-center gap-3 shadow-lg backdrop-blur-md">
                    <Search className="w-5 h-5 text-slate-500 ml-1" />
                    <input type="text" placeholder="Buscar Placa, CPF, Ocorrência..." className="bg-transparent border-none outline-none text-white text-sm w-full font-medium" />
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default GovDashboard;