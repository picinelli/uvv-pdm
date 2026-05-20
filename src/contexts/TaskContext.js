import React, { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';

import {
  fetchTasks,
  createTask as apiCreateTask,
  deleteTask as apiDeleteTask,
  updateTask as apiUpdateTask,
} from '../services/api';
import { useUser } from './UserContext';

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { usuarioId } = useUser();
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const carregar = useCallback(async () => {
    if (!usuarioId) {
      setTarefas([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks(usuarioId);
      setTarefas(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [usuarioId]);

  const adicionar = useCallback(
    async (payload) => {
      const nova = await apiCreateTask({ ...payload, usuarioId });
      setTarefas((prev) => [nova, ...prev]);
      return nova;
    },
    [usuarioId]
  );

  const excluir = useCallback(async (taskId) => {
    await apiDeleteTask(taskId);
    setTarefas((prev) => prev.filter((t) => t.id !== taskId));
  }, []);

  const atualizar = useCallback(async (taskId, patch) => {
    const atualizada = await apiUpdateTask(taskId, patch);
    if (!atualizada) return null;
    setTarefas((prev) => prev.map((t) => (t.id === taskId ? atualizada : t)));
    return atualizada;
  }, []);

  useEffect(() => {
    if (!usuarioId) {
      setTarefas([]);
      setError(null);
    }
  }, [usuarioId]);

  const value = useMemo(
    () => ({ tarefas, loading, error, carregar, adicionar, excluir, atualizar }),
    [tarefas, loading, error, carregar, adicionar, excluir, atualizar]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks deve ser usado dentro de TaskProvider');
  return ctx;
}
