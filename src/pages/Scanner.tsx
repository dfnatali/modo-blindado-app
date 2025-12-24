import { useState, useRef } from "react";
import { 
  Camera, 
  Barcode, 
  Link2, 
  Flag, 
  Search, 
  ShieldCheck, 
  AlertTriangle,
  Loader2,
  FileSearch,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type AnalysisState = "idle" | "loading" | "safe" | "danger";

const Scanner = () => {
  const [inputValue, setInputValue] = useState("");
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleAnalysis = (type: string) => {
    setAnalysisState("loading");
    toast.info(`Iniciando análise de ${type}...`);
    
    // Simula delay de análise tática
    setTimeout(() => {
      const isSafe = Math.random() > 0.4; // 60% de chance de ser seguro
      setAnalysisState(isSafe ? "safe" : "danger");
      if (isSafe) {
        toast.success("Análise concluída: Ameaça não detectada.");
      } else {
        toast.error("Alerta: Elemento malicioso identificado!");
      }
    }, 2500);
  };

  const triggerFileUpload = () => fileInputRef.current?.click();
  const triggerCamera = () => cameraInputRef.current?.click();

  const resetAnalysis = () => {
    setAnalysisState("idle");
    setInputValue("");
  };

  const actionButtons = [
    { 
      icon: Camera, 
      label: "Foto / QR Code", 
      color: "primary", 
      action: triggerCamera 
    },
    { 
      icon: Upload, 
      label: "Anexar Arquivo", 
      color: "secondary", 
      action: triggerFileUpload 
    },
    { 
      icon: Barcode, 
      label: "Verificar Boleto", 
      color: "secondary", 
      action: () => toast.warning("Funcionalidade em calibração") 
    },
    { 
      icon: Flag, 
      label: "Denunciar Golpe", 
      color: "warning", 
      action: () => toast.info("Redirecionando para central de denúncias") 
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Inputs Ocultos para Funcionalidades Mobile */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={() => handleAnalysis("arquivo")}
      />
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        ref={cameraInputRef} 
        className="hidden" 
        onChange={() => handleAnalysis("câmera")}
      />

      {analysisState === "idle" && (
        <>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Cole um link ou código de barras..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="h-14 pl-12 pr-32 bg-card border-border rounded-2xl focus-visible:ring-primary/20"
            />
            <Button
              onClick={() => handleAnalysis("link")}
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 rounded-xl px-6"
            >
              Analisar
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {actionButtons.map((btn) => (
              <button
                key={btn.label}
                onClick={btn.action}
                className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-3 hover:bg-surface-elevated transition-all active:scale-95 group"
              >
                <div className={`p-3 rounded-xl ${
                  btn.color === 'primary' ? 'bg-primary/10 text-primary' : 
                  btn.color === 'warning' ? 'bg-warning/10 text-warning' : 'bg-secondary text-muted-foreground'
                } group-hover:scale-110 transition-transform`}>
                  <btn.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-foreground">{btn.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {analysisState === "loading" && (
        <div className="bg-card rounded-2xl p-12 border border-border flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <FileSearch className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Analisando Ameaças</h3>
            <p className="text-sm text-muted-foreground">Verificando bases de dados em tempo real...</p>
          </div>
        </div>
      )}

      {analysisState === "safe" && (
        <div className="bg-card rounded-2xl p-8 border border-border text-center space-y-6">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-10 h-10 text-success" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Ambiente Seguro</h3>
            <p className="text-muted-foreground">Nenhum comportamento malicioso foi detectado nesta análise.</p>
          </div>
          <Button onClick={resetAnalysis} className="w-full h-12 rounded-xl bg-primary">
            Nova Análise
          </Button>
        </div>
      )}

      {analysisState === "danger" && (
        <div className="bg-card rounded-2xl p-8 border border-destructive/20 text-center space-y-6 animate-shake">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2 text-destructive">Ameaça Detectada!</h3>
            <p className="text-muted-foreground">Este elemento apresenta alto risco de fraude ou roubo de dados.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={resetAnalysis} variant="outline" className="flex-1 h-12 rounded-xl">Voltar</Button>
            <Button className="flex-1 h-12 rounded-xl bg-destructive hover:bg-destructive/90">Denunciar</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;