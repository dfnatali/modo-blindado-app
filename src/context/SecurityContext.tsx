import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// IDs OBRIGATÓRIOS - Têm que ser IGUAIS aos da Blindagem
const SECURITY_MODULE_IDS = [
  "networkGuard",
  "smsShield",
  "vpn",
  "antivirus",
  "remoteLock",
  "ghostVault",
  "tagTether",
  "biometrics"
];

interface SecurityContextType {
  toggles: Record<string, boolean>;
  toggleProtection: (id: string) => void;
  securityPercentage: number;
  activeCount: number;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const SecurityProvider = ({ children }: { children: ReactNode }) => {
  // Estado Inicial
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    SECURITY_MODULE_IDS.forEach(id => {
       // Inicia apenas com VPN e Antivirus (Exemplo)
       initialState[id] = id === "vpn" || id === "antivirus";
    });
    return initialState;
  });

  const [securityPercentage, setSecurityPercentage] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const active = Object.values(toggles).filter(Boolean).length;
    const total = SECURITY_MODULE_IDS.length;
    const percentage = Math.round((active / total) * 100);
    setActiveCount(active);
    setSecurityPercentage(percentage);
  }, [toggles]);

  const toggleProtection = (id: string) => {
    setToggles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <SecurityContext.Provider value={{ toggles, toggleProtection, securityPercentage, activeCount }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};