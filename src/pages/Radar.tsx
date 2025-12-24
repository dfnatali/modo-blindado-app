import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Zap, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";

// --- TIPAGEM FORTE ---
type LocationData = {
  lat: number;
  lng: number;
  label: string;
};

// --- DADOS DA SIMULAÇÃO ---
const LOCATIONS: Record<string, LocationData> = {
  GRU: { lat: -23.4262, lng: -46.4682, label: "Aeroporto Guarulhos" },
  TIETE: { lat: -23.5162, lng: -46.6237, label: "Rodoviária Tietê" },
  RIO: { lat: -22.9068, lng: -43.1729, label: "Rio de Janeiro" },
  SANTOS: { lat: -23.9618, lng: -46.3322, label: "Porto de Santos" }
};

const Radar = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const routesRef = useRef<L.Polyline[]>([]);

  // Estados
  const [origin, setOrigin] = useState<string>("");
  const [dest, setDest] = useState<string>("");
  const [step, setStep] = useState<number>(0);

  // 1. Inicializa Mapa (MANTIDO CLARO PARA VISIBILIDADE TÁTICA, COMO GOOGLE MAPS)
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      center: [-23.5505, -46.6333],
      zoom: 10,
      zoomControl: false,
    });

    // Tiles Claros (Estilo Google)
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(mapInstance.current);

    // Zonas de Calor (Vermelhas)
    const heatmaps = [
      { lat: -23.4800, lng: -46.5000 },
      { lat: -22.9500, lng: -43.2000 }
    ];

    heatmaps.forEach(h => {
      L.circle([h.lat, h.lng], {
        color: 'transparent',
        fillColor: '#ef4444',
        fillOpacity: 0.5,
        radius: 3000
      }).addTo(mapInstance.current!);
    });

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  // 2. Função de Desenhar Rota (Visualização Interna)
  const drawRoute = async (startKey: string, endKey: string) => {
    if (!mapInstance.current) return;
    
    const start = LOCATIONS[startKey];
    const end = LOCATIONS[endKey];

    if (!start || !end) return;

    // Limpa rotas antigas
    routesRef.current.forEach(r => r.remove());
    routesRef.current = [];

    // URLs OSRM (Backend de Simulação)
    const urlRed = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
    
    // Cálculo do Desvio (Waypoint)
    const midLat = (start.lat + end.lat) / 2 + 0.1;
    const midLng = (start.lng + end.lng) / 2 + 0.1;
    const urlBlue = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${midLng},${midLat};${end.lng},${end.lat}?overview=full&geometries=geojson`;

    try {
      // Desenha Vermelha
      const resRed = await fetch(urlRed);
      const dataRed = await resRed.json();
      if(dataRed.routes?.[0]) {
        const coords = dataRed.routes[0].geometry.coordinates.map((c: number[]) => [c[1], c[0]]);
        const line = L.polyline(coords as L.LatLngExpression[], { color: '#ef4444', weight: 4, opacity: 0.6, dashArray: '10, 10' }).addTo(mapInstance.current!);
        routesRef.current.push(line);
      }

      // Desenha Azul (Blindada)
      const resBlue = await fetch(urlBlue);
      const dataBlue = await resBlue.json();
      if(dataBlue.routes?.[0]) {
        const coords = dataBlue.routes[0].geometry.coordinates.map((c: number[]) => [c[1], c[0]]);
        const line = L.polyline(coords as L.LatLngExpression[], { color: '#2563eb', weight: 6, opacity: 1 }).addTo(mapInstance.current!);
        routesRef.current.push(line);
        mapInstance.current!.fitBounds(line.getBounds(), { padding: [50, 50] });
      }
      toast.success("Estratégia de Rotas Calculada");
    } catch (e) { console.error(e); }
  };

  // 3. Handlers
  const handleOrigin = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setOrigin(val);
    const loc = LOCATIONS[val];
    if(mapInstance.current && loc) {
        mapInstance.current.setView([loc.lat, loc.lng], 13);
        L.marker([loc.lat, loc.lng]).addTo(mapInstance.current);
        setStep(1);
    }
  };

  const handleDest = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setDest(val);
    const loc = LOCATIONS[val];
    if(mapInstance.current && loc) {
        L.marker([loc.lat, loc.lng]).addTo(mapInstance.current);
        drawRoute(origin, val);
        setStep(2);
    }
  };

  // 4. LÓGICA DE NAVEGAÇÃO REAL (Google Maps Externo)
  const openRealGPS = (type: 'fast' | 'safe') => {
    if (!origin || !dest) return;

    const start = LOCATIONS[origin];
    const end = LOCATIONS[dest];
    
    toast.success(`Iniciando Navegação ${type === 'safe' ? 'BLINDADA' : 'RÁPIDA'}...`);

    let googleUrl = `https://www.google.com/maps/dir/?api=1&origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&travelmode=driving`;

    if (type === 'safe') {
      // Injeta o MESMO waypoint matemático usado na linha azul visual
      const midLat = (start.lat + end.lat) / 2 + 0.1;
      const midLng = (start.lng + end.lng) / 2 + 0.1;
      googleUrl += `&waypoints=${midLat},${midLng}`;
    }

    // Delay tático para sensação de processamento
    setTimeout(() => window.open(googleUrl, "_blank"), 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] w-full bg-zinc-950 relative">
      
      {/* MAPA (MANTIDO CLARO) */}
      <div className="h-[55%] w-full relative z-0">
        <div ref={mapRef} className="w-full h-full" />
      </div>

      {/* CONTROLES (AGORA EM DARK MODE) */}
      <div className="flex-1 bg-zinc-950 rounded-t-[30px] shadow-[0_-5px_40px_rgba(0,0,0,0.6)] border-t border-white/10 -mt-8 z-10 p-6 flex flex-col gap-4 relative">
        <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto" />

        {/* Origem */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Origem</label>
          <select 
            className="w-full h-12 bg-zinc-900 border border-white/10 rounded-xl px-3 text-sm text-zinc-200 focus:ring-2 focus:ring-primary outline-none"
            value={origin} 
            onChange={handleOrigin}
          >
            <option value="">Selecione Ponto de Partida...</option>
            <option value="GRU">Aeroporto Guarulhos</option>
            <option value="TIETE">Rodoviária Tietê</option>
          </select>
        </div>

        {/* Destino */}
        <div className={`space-y-1 transition-opacity ${step >= 1 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
          <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1">Destino</label>
          <select 
            className="w-full h-12 bg-zinc-900 border border-white/10 rounded-xl px-3 text-sm text-zinc-200 focus:ring-2 focus:ring-primary outline-none"
            value={dest} 
            onChange={handleDest}
          >
            <option value="">Selecione Destino...</option>
            <option value="RIO">Rio de Janeiro</option>
            <option value="SANTOS">Porto de Santos</option>
          </select>
        </div>

        {/* Modais */}
        {step >= 2 && (
          <div className="flex gap-2 animate-in slide-in-from-bottom-5">
             <Button variant="outline" className="flex-1 border-white/10 text-zinc-400 bg-zinc-900 hover:bg-zinc-800 hover:text-white" onClick={() => setStep(3)}>Carro</Button>
             <Button variant="outline" className="flex-1 border-white/10 text-zinc-400 bg-zinc-900 hover:bg-zinc-800 hover:text-white" onClick={() => setStep(3)}>Moto</Button>
          </div>
        )}

        {/* Ação (CTA REAIS) */}
        {step >= 3 && (
          <div className="grid grid-cols-2 gap-3 animate-in zoom-in-95">
             <Button 
                className="h-12 bg-zinc-900 border border-red-500/30 text-red-500 hover:bg-zinc-800 flex gap-2" 
                onClick={() => openRealGPS('fast')}
             >
               <Zap size={16}/> Rápida
             </Button>
             
             <Button 
                className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 flex gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)]" 
                onClick={() => openRealGPS('safe')}
             >
               <ShieldCheck size={16}/> Blindada
             </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Radar;