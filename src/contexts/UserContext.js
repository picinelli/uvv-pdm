import React, { createContext, useState, useMemo, useContext } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const value = useMemo(
    () => ({
      usuario,
      usuarioId: usuario?.id ?? null,
      setUsuario,
      logout: () => setUsuario(null),
    }),
    [usuario]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser deve ser usado dentro de UserProvider');
  return ctx;
}
