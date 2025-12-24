import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// IMPORTAÇÕES CORRIGIDAS (Usando o alias @ que aponta para src)
import { SecurityProvider } from "@/context/SecurityContext";

import HomePage from "@/pages/HomePage";
import Index from "@/pages/Index"; // Página do Radar
import BlindagemPage from "@/pages/BlindagemPage";
import ScannerPage from "@/pages/ScannerPage";
import PerfilPage from "@/pages/PerfilPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SecurityProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/radar" element={<Index />} />
            <Route path="/blindagem" element={<BlindagemPage />} />
            <Route path="/scanner" element={<ScannerPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            {/* Rota para erros 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SecurityProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;