import { supabase } from './supabase';

export async function createUser({ nome, email, telefone }) {
  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nome, email, telefone: telefone || null }])
    .select()
    .single();

  if (error) {
    if (__DEV__) console.log('[createUser] erro:', error);
    throw new Error(traduzirErro(error));
  }
  return data;
}

export async function fetchTasks(usuarioId) {
  if (!usuarioId) return [];
  const { data, error } = await supabase
    .from('tarefas')
    .select('*')
    .eq('usuario_id', usuarioId)
    .order('created_at', { ascending: false });

  if (error) {
    if (__DEV__) console.log('[fetchTasks] erro:', error);
    throw new Error(traduzirErro(error));
  }
  return data ?? [];
}

export async function fetchTaskById(taskId) {
  const { data, error } = await supabase
    .from('tarefas')
    .select('*')
    .eq('id', taskId)
    .single();

  if (error) {
    if (__DEV__) console.log('[fetchTaskById] erro:', error);
    throw new Error(traduzirErro(error));
  }
  return data;
}

export async function createTask({ titulo, descricao, status, prioridade, usuarioId }) {
  const { data, error } = await supabase
    .from('tarefas')
    .insert([
      {
        titulo,
        descricao: descricao || null,
        status,
        prioridade,
        usuario_id: usuarioId,
      },
    ])
    .select()
    .single();

  if (error) {
    if (__DEV__) console.log('[createTask] erro:', error);
    throw new Error(traduzirErro(error));
  }
  return data;
}

function traduzirErro(error) {
  if (error?.code === '23505') return 'Registro duplicado (e-mail já cadastrado).';
  if (error?.message?.includes('Failed to fetch')) return 'Sem conexão com o servidor.';
  return error?.message || 'Erro inesperado ao acessar a API.';
}
