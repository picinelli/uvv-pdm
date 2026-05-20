import React, { createContext, useState, useEffect, useMemo, useContext, useCallback, useRef } from 'react';

import { supabase } from '../services/supabase';
import { fetchProfile, signOutUser } from '../services/api';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const montado = useRef(true);

  const aplicarSessao = useCallback(async (session) => {
    if (!session?.user) {
      if (montado.current) setUsuario(null);
      return;
    }

    if (!session.user.email_confirmed_at) {
      await supabase.auth.signOut();
      if (montado.current) setUsuario(null);
      return;
    }

    try {
      const perfil = await fetchProfile(session.user.id);
      if (montado.current) setUsuario(perfil);
    } catch (e) {
      if (__DEV__) console.log('[UserContext] erro ao carregar perfil:', e);
      if (montado.current) {
        setUsuario({
          id: session.user.id,
          nome: session.user.user_metadata?.nome ?? '',
          email: session.user.email ?? '',
          telefone: session.user.user_metadata?.telefone ?? null,
        });
      }
    }
  }, []);

  useEffect(() => {
    montado.current = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      await aplicarSessao(data.session);
      if (montado.current) setCarregando(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      aplicarSessao(session);
    });

    return () => {
      montado.current = false;
      sub.subscription.unsubscribe();
    };
  }, [aplicarSessao]);

  const logout = useCallback(async () => {
    try {
      await signOutUser();
    } catch (e) {
      if (__DEV__) console.log('[UserContext] erro ao fazer logout:', e);
    }
  }, []);

  const value = useMemo(
    () => ({
      usuario,
      usuarioId: usuario?.id ?? null,
      logado: Boolean(usuario),
      carregando,
      logout,
    }),
    [usuario, carregando, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser deve ser usado dentro de UserProvider');
  return ctx;
}
